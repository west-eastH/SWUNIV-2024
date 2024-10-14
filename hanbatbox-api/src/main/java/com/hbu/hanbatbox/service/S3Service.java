package com.hbu.hanbatbox.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.hbu.hanbatbox.domain.MetadataFactory;
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

  public void uploads(List<MultipartFile> files) {
    files.forEach(file -> {
      PutObjectRequest objectRequest = createObjectRequest(file);
      RequestBody body = RequestBody.fromFile(getFile(file));
      s3Client.putObject(objectRequest, body);
    });
  }

  private PutObjectRequest createObjectRequest(MultipartFile file) {
    return PutObjectRequest.builder()
        .bucket(bucketName)
        .key(file.getName())
        .contentLength(file.getSize())
        .contentType(file.getContentType())
        .metadata(MetadataFactory.create(file.getName()))
        .build();
  }

  private File getFile(MultipartFile multipartFile) {
    try {
      return multipartFile.getResource().getFile();
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생하였습니다.");
    }
  }

}
