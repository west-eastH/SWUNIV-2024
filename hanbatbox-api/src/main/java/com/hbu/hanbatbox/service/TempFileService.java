package com.hbu.hanbatbox.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TempFileService {

  public Path[] makeTempFiles(MultipartFile[] files) throws IOException {

    List<Path> tempFiles = new ArrayList<>();

    for (MultipartFile file : files) {

      if (file.isEmpty()) {
        throw new RuntimeException("File upload failed!");
      }

      Path tempFile = Files.createTempFile("upload-", file.getOriginalFilename());
      System.out.println("tempfile : " + tempFile.getFileName().toString());
      file.transferTo(tempFile.toFile());

      tempFiles.add(tempFile);
    }

    return tempFiles.toArray(new Path[0]);
  }
}
