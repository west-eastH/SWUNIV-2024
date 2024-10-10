package com.hbu.hanbatbox.S3.controller;

import com.hbu.hanbatbox.S3.service.S3Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import com.hbu.hanbatbox.exception.HanbatExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class S3Controller {

  private final S3Service s3Service;

  @PostMapping("/upload")
  public ResponseEntity<String> uploadFile(@RequestParam("title") String title,
      @RequestParam(value = "password", required = false) String password,
      @RequestParam("file") MultipartFile file) {
    try {
      // 임시 파일 생성
      Path tempFile = Files.createTempFile("upload-", title);
      file.transferTo(tempFile.toFile());

      String objectKey = System.currentTimeMillis() + "-" + title;
      s3Service.uploadFile(objectKey, title, password, tempFile);

      Files.delete(tempFile);

      return new ResponseEntity<>("File uploaded successfully!", HttpStatus.OK);
    } catch (IOException e) {
      return new HanbatExceptionHandler("File upload failed!").throwServerException();
    }
  }
}
