package com.hbu.hanbatbox.controller;

import com.hbu.hanbatbox.repository.BoxRepository;
import com.hbu.hanbatbox.service.S3Service;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class S3Controller {

  private final S3Service s3Service;
  private final BoxRepository boxRepository;

  @PostMapping(value = "/downloads/{id}", consumes = {MediaType.TEXT_PLAIN_VALUE,
      MediaType.APPLICATION_JSON_VALUE})
  public void downloads(@PathVariable("id") Long id, @RequestBody Map<String, String> data,
      HttpServletResponse response) throws IOException {

    String inputPassword = data.getOrDefault("password", "");
    if (!s3Service.validatePassword(id, inputPassword)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
    }

    String[] objectKeys = s3Service.getObjectKeysByBoxId(id);
    String title = s3Service.getBoxTitleById(id) + ".zip";

    if (objectKeys.length == 1) {
      s3Service.downloadSingleFile(title, objectKeys[0], response);
    } else {
      s3Service.downloadMultipleFiles(title, objectKeys, response);
    }
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Void> deleteFile(@PathVariable("id") Long id, @RequestParam String password)
      throws IOException {

    if (!s3Service.validatePassword(id, password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
    }

    boxRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.OK);
  }
}
