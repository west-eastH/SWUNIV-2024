package com.hbu.hanbatbox.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
public class S3Service {

  private final S3Client s3Client;

  @Value("${spring.cloud.aws.S3.bucket}")
  private String bucketName;

  public S3Service(S3Client s3Client) {
    this.s3Client = s3Client;
  }

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

}
