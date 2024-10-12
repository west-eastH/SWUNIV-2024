package com.hbu.hanbatbox.service;

import java.io.InputStream;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
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

  @Autowired
  public S3Service(S3Client s3Client) {
    this.s3Client = s3Client;
  }

  public void uploadFile(String objectKey, String title, String password, Path filePath) {

    Map<String, String> metadata = new HashMap<>();

    metadata.put("title", title);
    metadata.put("password", password);

    PutObjectRequest putObjectRequest = PutObjectRequest.builder().bucket(bucketName).key(objectKey)
        .metadata(metadata).build();

    s3Client.putObject(putObjectRequest, RequestBody.fromFile(filePath));
  }

  public InputStream downloadFile(String objectKey) {
    GetObjectRequest getObjectRequest = GetObjectRequest.builder().bucket(bucketName).key(objectKey)
        .build();

    return s3Client.getObject(getObjectRequest);
  }

  public String getFileTitle(String objectKey) {
    HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
        .bucket(bucketName)
        .key(objectKey)
        .build();

    HeadObjectResponse headObjectResponse = s3Client.headObject(headObjectRequest);
    Map<String, String> metadata = headObjectResponse.metadata();

    return metadata.get("title"); // 파일 크기 반환
  }

  public long getFileSize(String objectKey) {
    HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
        .bucket(bucketName)
        .key(objectKey)
        .build();

    HeadObjectResponse headObjectResponse = s3Client.headObject(headObjectRequest);
    return headObjectResponse.contentLength(); // 파일 크기 반환
  }
}