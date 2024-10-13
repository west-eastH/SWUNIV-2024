package com.hbu.hanbatbox.controller;

import com.hbu.hanbatbox.service.S3Service;
import com.hbu.hanbatbox.service.TempFileService;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
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
@RequestMapping("/files")
@RequiredArgsConstructor
public class S3Controller {

  private final TempFileService tempFileService;
  private final S3Service s3Service;

  @PostMapping("/upload")
  public ResponseEntity<String> uploadFile(@RequestParam("title") String title,
      @RequestParam(value = "password", required = false) String password,
      @RequestParam("files") MultipartFile[] files) throws IOException {

    if (files.length == 0) {
      throw new RuntimeException("File upload failed!");
    }

    Path[] tempFiles = tempFileService.makeTempFiles(files);

    int i = 0;
    for (Path tempFile : tempFiles) {
      String extension = tempFile.getFileName().toString().split("\\.")[1];
      String objectKey = "%d-%s-%d.%s".formatted(System.currentTimeMillis(), title, i++, extension);

      s3Service.uploadFile(objectKey, title, tempFile);
      Files.delete(tempFile);
    }

    return new ResponseEntity<>("File uploaded successfully!", HttpStatus.OK);
  }

  @GetMapping("/download/{id}")
  public void downloadFile(@PathVariable("id") int id,
      @RequestParam(value = "password", required = false) String password,
      HttpServletResponse response) throws IOException {

    // DB에서 id를 통해 ObjectKey와 title을 가져옴

    // test를 위한 코드
    String[] objectKeys = {"1728745310167-bird.jpg", "1728747275741-test.txt"};
    String title = "test.zip";

    if (objectKeys.length == 1) {
      downloadSingleFile(title, objectKeys[0], response);
    } else {
      downloadMultipleFiles(title, objectKeys, response);
    }
  }

  public void downloadSingleFile(String title, String objectKey, HttpServletResponse response)
      throws IOException {
    InputStream inputStream = s3Service.downloadFile(objectKey);
    long fileSize = s3Service.getFileSize(objectKey);

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
        InputStream inputStream = s3Service.downloadFile(objectKey);

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
