package com.hbu.hanbatbox.service;

import com.hbu.hanbatbox.domain.Box;
import com.hbu.hanbatbox.repository.BoxRepository;
import com.hbu.hanbatbox.domain.Item;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@RequiredArgsConstructor
public class S3Service {

  private final S3Client s3Client;
  private final PasswordEncoder passwordEncoder;
  private final BoxRepository boxRepository;

  @Value("${spring.cloud.aws.S3.bucket}")
  private String bucketName;

  private PutObjectRequest buildPutObjectRequest(String objectKey, MultipartFile file) {
    return PutObjectRequest.builder()
        .bucket(bucketName)
        .key(objectKey)
        .contentLength(file.getSize())
        .contentType(file.getContentType())
        .build();
  }

  private GetObjectRequest buildGetObjectRequest(String objectKey) {
    return GetObjectRequest.builder()
        .bucket(bucketName)
        .key(objectKey)
        .build();
  }

  private HeadObjectRequest buildHeadObjectRequest(String objectKey) {
    return HeadObjectRequest.builder()
        .bucket(bucketName)
        .key(objectKey)
        .build();
  }

  private String createObjectKey(String title, String originFileName) {

    if (originFileName == null || !originFileName.contains(".")) {
      throw new IllegalArgumentException("올바른 파일을 추가해 주세요.");
    }

    String extension = originFileName.split("\\.")[1];
    return "%d-%s.%s".formatted(System.currentTimeMillis(), title, extension);
  }

  public String uploadFileAndGetObjectKey(String title, MultipartFile file) {

    String objectKey = createObjectKey(title, Objects.requireNonNull(file.getOriginalFilename()));

    PutObjectRequest objectRequest = buildPutObjectRequest(objectKey, file);
    RequestBody body = RequestBody.fromInputStream(getInputStream(file), file.getSize());
    s3Client.putObject(objectRequest, body);

    return objectKey;
  }

  public InputStream downloads(String objectKey) throws RuntimeException {
    return s3Client.getObject(buildGetObjectRequest(objectKey));
  }

  public long getFileSize(String objectKey) {
    HeadObjectResponse headObjectResponse = s3Client.headObject(buildHeadObjectRequest(objectKey));
    return headObjectResponse.contentLength();
  }

  private InputStream getInputStream(MultipartFile multipartFile) {
    try {
      return multipartFile.getInputStream();
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생하였습니다.");
    }
  }

  public boolean validatePassword(Long id, String inputPassword) {
    Box box = boxRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Box not found"));

    if (box.isCrypted()) {
      return passwordEncoder.matches(inputPassword, box.getPassword());
    }
    return true;
  }

  public String[] getObjectKeysByBoxId(Long id) {
    Box box = boxRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Box not found"));
    return box.getItems().stream().map(Item::getObjectKey).toArray(String[]::new);
  }

  public String getBoxTitleById(Long id) {
    return boxRepository.findById(id)
        .map(Box::getTitle)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Box not found"));
  }

  public void downloadSingleFile(String title, String objectKey, HttpServletResponse response)
      throws IOException {
    InputStream inputStream = downloads(objectKey);
    long fileSize = getFileSize(objectKey);

    response.setContentType("application/octet-stream");
    response.setContentLengthLong(fileSize);
    response.setHeader("Content-Disposition",
        "attachment; filename=\"" + URLEncoder.encode(title, StandardCharsets.UTF_8) + "\";");
    response.setHeader("Content-Transfer-Encoding", "binary");

    try (OutputStream outputStream = response.getOutputStream()) {
      byte[] buffer = new byte[4096];
      int bytesRead;

      while ((bytesRead = inputStream.read(buffer)) != -1) {
        outputStream.write(buffer, 0, bytesRead);
      }

      outputStream.flush();
    }

    inputStream.close();
  }

  public void downloadMultipleFiles(String title, String[] objectKeys, HttpServletResponse response)
      throws IOException {

    long fileSize = 0;
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Disposition",
        "attachment; filename=\"" + URLEncoder.encode(title, StandardCharsets.UTF_8) + "\";");
    response.setHeader("Content-Transfer-Encoding", "binary");

    try (ZipOutputStream zipOut = new ZipOutputStream(response.getOutputStream())) {
      for (String objectKey : objectKeys) {
        InputStream inputStream = downloads(objectKey);

        ZipEntry zipEntry = new ZipEntry(objectKey);
        zipOut.putNextEntry(zipEntry);
        fileSize += zipEntry.getCompressedSize();

        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
          zipOut.write(buffer, 0, bytesRead);
        }

        zipOut.closeEntry();
        inputStream.close();
      }
    }

    response.setContentLengthLong(fileSize);
  }
}
