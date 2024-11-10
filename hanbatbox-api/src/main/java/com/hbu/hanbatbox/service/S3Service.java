package com.hbu.hanbatbox.service;

import com.hbu.hanbatbox.controller.dto.S3FileDetails;
import com.hbu.hanbatbox.domain.Box;
import com.hbu.hanbatbox.domain.Item;
import com.hbu.hanbatbox.repository.BoxRepository;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.core.async.AsyncResponseTransformer;
import software.amazon.awssdk.core.async.BlockingInputStreamAsyncRequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.DownloadRequest;
import software.amazon.awssdk.transfer.s3.model.UploadRequest;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {

  private final S3Client s3Client;
  private final S3TransferManager transferManager;
  private final PasswordEncoder passwordEncoder;
  private final BoxRepository boxRepository;

  @Value("${spring.cloud.aws.S3.bucket}")
  private String bucketName;

  private PutObjectRequest buildPutObjectRequest(String objectKey, MultipartFile file) {
    return PutObjectRequest.builder().bucket(bucketName).key(objectKey)
        .contentLength(file.getSize()).contentType(file.getContentType()).build();
  }

  private GetObjectRequest buildGetObjectRequest(String objectKey) {
    return GetObjectRequest.builder().bucket(bucketName).key(objectKey).build();
  }

  private UploadRequest buildUploadRequest(String objectKey, MultipartFile file,
      BlockingInputStreamAsyncRequestBody body) {
    return UploadRequest.builder().requestBody(body)
        .putObjectRequest(buildPutObjectRequest(objectKey, file)).build();
  }

  private DownloadRequest<ResponseBytes<GetObjectResponse>> buildDownloadRequest(String objectKey) {

    return DownloadRequest.builder().getObjectRequest(buildGetObjectRequest(objectKey))
        .responseTransformer(AsyncResponseTransformer.toBytes()).build();
  }

  private String createObjectKey(String title, String originFileName) {

    if (originFileName == null || !originFileName.contains(".")) {
      throw new IllegalArgumentException("올바른 파일을 추가해 주세요.");
    }

    String extension = originFileName.substring(originFileName.lastIndexOf('.') + 1);
    return "%d-%s.%s".formatted(System.currentTimeMillis(), title, extension);
  }

  public String[] getObjectKeysByBoxId(Long id) {
    Box box = boxRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Box not found"));
    return box.getItems().stream().map(Item::getObjectKey).toArray(String[]::new);
  }

  public String getBoxTitleById(Long id) {
    return boxRepository.findById(id).map(Box::getTitle)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Box not found"));
  }

  public String uploadFileAndGetObjectKey(String title, MultipartFile file) throws IOException {

    String objectKey = createObjectKey(title, Objects.requireNonNull(file.getOriginalFilename()));
    log.warn("key : " + objectKey);

    BlockingInputStreamAsyncRequestBody body = AsyncRequestBody.forBlockingInputStream(
        file.getSize());

    transferManager.upload(buildUploadRequest(objectKey, file, body));

    body.writeInputStream(new ByteArrayInputStream(file.getBytes()));

    return objectKey;
  }

  public boolean validatePassword(Long id, String inputPassword) {
    Box box = boxRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Box not found"));

    if (box.isCrypted()) {
      return passwordEncoder.matches(inputPassword, box.getPassword());
    }
    return true;
  }

  public byte[] downloads(String objectKey) {
    return transferManager.download(buildDownloadRequest(objectKey)).completionFuture()
        .orTimeout(3, TimeUnit.MINUTES).join().result().asByteArray();
  }

  public ResponseInputStream<GetObjectResponse> downloads1(String objectKey)
      throws RuntimeException {
    return s3Client.getObject(buildGetObjectRequest(objectKey));
  }

  public S3FileDetails downloadFile(Long id, String password) {
    if (!validatePassword(id, password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
    }

    Box box = boxRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Box not found"));

    String[] objectKeys = getObjectKeysByBoxId(id);

    if (isSingleFile(objectKeys)) {
      return downloadSingleFile(objectKeys[0], objectKeys[0], box.getFileSize());
    }

    String title = getBoxTitleById(id) + ".zip";

    return downloadMultipleFiles(title, objectKeys);
  }

  private S3FileDetails downloadSingleFile(String title, String objectKey, Long fileSize) {

    byte[] bytes = downloads(objectKey);

    return new S3FileDetails(title, fileSize, bytes);
  }

  private S3FileDetails downloadMultipleFiles(String title, String[] objectKeys) {
    try (ByteArrayOutputStream byteOutput = new ByteArrayOutputStream(); ZipArchiveOutputStream zipOut = new ZipArchiveOutputStream(
        byteOutput)) {

      for (String objectKey : objectKeys) {

        byte[] bytes = downloads(objectKey);

        ZipArchiveEntry zipEntry = new ZipArchiveEntry(objectKey);
        zipOut.putArchiveEntry(zipEntry);

        zipOut.write(bytes);

        zipOut.closeArchiveEntry();

        log.warn("ZIP entry added for object key: " + objectKey);
      }

      zipOut.finish();

      return new S3FileDetails(title, byteOutput.size(), byteOutput.toByteArray());

    } catch (IOException | RuntimeException e) {
      log.error("Failed to create zip file", e);
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to create zip file");
    }
  }

  private S3FileDetails downloadSingleFile1(String title, String objectKey, Long fileSize) {
    ResponseInputStream<GetObjectResponse> s3Stream = downloads1(objectKey);
    try {
      byte[] bytes = s3Stream.readAllBytes();
      return new S3FileDetails(title, fileSize, bytes);
    } catch (IOException ex) {
      ex.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
          "external file i/o error");
    }
  }

  private S3FileDetails downloadMultipleFiles1(String title, String[] objectKeys) {
    try (ByteArrayOutputStream byteOutput = new ByteArrayOutputStream(); ZipArchiveOutputStream zipOut = new ZipArchiveOutputStream(
        byteOutput)) {

      for (String objectKey : objectKeys) {
        try (ResponseInputStream<GetObjectResponse> s3Stream = downloads1(objectKey)) {

          ZipArchiveEntry zipEntry = new ZipArchiveEntry(objectKey);
          zipOut.putArchiveEntry(zipEntry);

          zipOut.write(s3Stream.readAllBytes());

          zipOut.closeArchiveEntry();
          log.warn("ZIP entry added for object key: " + objectKey);
        } catch (IOException e) {
          log.error("Error writing file to zip for object key: " + objectKey, e);
        }
      }

      zipOut.finish();

      return new S3FileDetails(title, byteOutput.size(), byteOutput.toByteArray());

    } catch (IOException | RuntimeException e) {
      log.error("Failed to create zip file", e);
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to create zip file");
    }
  }

  private boolean isSingleFile(String[] keys) {
    return keys.length == 1;
  }

}