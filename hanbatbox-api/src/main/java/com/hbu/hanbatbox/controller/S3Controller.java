package com.hbu.hanbatbox.controller;

import com.hbu.hanbatbox.entitiy.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("title") String title,
                                             @RequestParam(value = "password", required = false) String password,
                                             @RequestParam("file") MultipartFile file) throws IOException {
        if(file.isEmpty())
            throw new RuntimeException("File upload failed!");

        Path tempFile = Files.createTempFile("upload-", title);
        file.transferTo(tempFile.toFile());

        String objectKey = System.currentTimeMillis() + "-" + title;

        s3Service.uploadFile(objectKey, title, password, tempFile);

        Files.delete(tempFile);

        return new ResponseEntity<>("File uploaded successfully!", HttpStatus.OK);
    }
}
