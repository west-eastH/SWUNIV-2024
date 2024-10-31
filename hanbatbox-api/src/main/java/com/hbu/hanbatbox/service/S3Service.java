package com.hbu.hanbatbox.service;

import com.hbu.hanbatbox.controller.dto.S3FileDetails;
import com.hbu.hanbatbox.domain.Box;
import com.hbu.hanbatbox.domain.Item;
import com.hbu.hanbatbox.repository.BoxRepository;

import java.io.*;
import java.util.Arrays;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

@Service
@RequiredArgsConstructor
@Slf4j
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


  public ResponseInputStream<GetObjectResponse> downloads(String objectKey) throws RuntimeException {
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


  public S3FileDetails downloadFile(Long id, String password) {
    if (!validatePassword(id, password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
    }

    Box box = boxRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Box not found"));

    String[] objectKeys = getObjectKeysByBoxId(id);

    if (isSingleFile(objectKeys)) {
      return downloadSingleFile(objectKeys[0], objectKeys[0], box.getFileSize());
    }

    String title = getBoxTitleById(id) + ".zip";
    return downloadMultipleFiles(title, objectKeys, box.getFileSize());
  }

  private S3FileDetails downloadSingleFile(String title, String objectKey, Long fileSize) {
    ResponseInputStream<GetObjectResponse> s3Stream = downloads(objectKey);
    try {
      byte[] bytes = s3Stream.readAllBytes();
      return new S3FileDetails(title, fileSize, bytes);
    } catch (IOException ex) {
      ex.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "external file i/o error");
    }
  }

  private S3FileDetails downloadMultipleFiles(String title, String[] objectKeys, Long fileSize) {
    try (ByteArrayOutputStream byteOutput = new ByteArrayOutputStream();
         ZipOutputStream zipOut = new ZipOutputStream(byteOutput)) {

      for (String objectKey : objectKeys) {
        try (ResponseInputStream<GetObjectResponse> s3Stream = downloads(objectKey)) {
          enterZip(zipOut, objectKey);
          write(zipOut, s3Stream);
          zipOut.closeEntry();
        } catch (IOException e) {
          System.err.println("Error writing file to zip for object key: " + objectKey + ", error: " + e.getMessage());
        }
      }

      zipOut.close();
      return new S3FileDetails(title, fileSize, byteOutput.toByteArray());
    } catch (IOException e) {
      throw new RuntimeException("Failed to create zip file", e);
    }
  }

  private void write(ZipOutputStream zipOutputStream, ResponseInputStream<GetObjectResponse> content) {
    try {
      zipOutputStream.write(content.readAllBytes());
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "external file i/o error");
    }
  }

  private void enterZip(ZipOutputStream zipOutputStream, String key) {
    ZipEntry entry = new ZipEntry(key);
    try {
      zipOutputStream.putNextEntry(entry);
    } catch (IOException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "external file i/o error");
    }
  }

  private boolean isSingleFile(String[] keys) {
    return keys.length == 1;
  }

}
