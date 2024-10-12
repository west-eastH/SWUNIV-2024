package com.hbu.hanbatbox.controller;

import com.hbu.hanbatbox.service.S3Service;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
      @RequestParam("file") MultipartFile file) throws IOException {
    if (file.isEmpty()) {
      throw new RuntimeException("File upload failed!");
    }

    Path tempFile = Files.createTempFile("upload-", title);
    file.transferTo(tempFile.toFile());

    String objectKey = System.currentTimeMillis() + "-" + title;

    s3Service.uploadFile(objectKey, title, password, tempFile);

    Files.delete(tempFile);

    return new ResponseEntity<>("File uploaded successfully!", HttpStatus.OK);
  }

  @GetMapping("/download/{id}")
  public void downloadFile(@PathVariable("id") int id,
      @RequestParam(value = "password", required = false) String password,
      HttpServletResponse response) throws IOException {

    // DB에서 id를 통해 ObjectKey를 검색

    // test를 위한 코드
    String objectKey = "1728745310167-bird.jpg";

    String fileName = URLEncoder.encode(s3Service.getFileTitle(objectKey), StandardCharsets.UTF_8);
    long fileSize = s3Service.getFileSize(objectKey);

    response.setContentType("application/octet-stream");
    response.setContentLengthLong(fileSize); // 파일 크기 설정
    response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
    response.setHeader("Content-Transfer-Encoding", "binary");

    InputStream inputStream = s3Service.downloadFile(objectKey);
    OutputStream outputStream = response.getOutputStream();

    byte[] buffer = new byte[4096];
    int bytesRead;

    while ((bytesRead = inputStream.read(buffer)) != -1) {
      outputStream.write(buffer, 0, bytesRead);
    }

    outputStream.flush();

    inputStream.close();
    outputStream.close();
  }
}
