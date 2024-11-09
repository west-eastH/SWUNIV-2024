package com.hbu.hanbatbox.controller;

import com.hbu.hanbatbox.controller.dto.Password;
import com.hbu.hanbatbox.controller.dto.S3FileDetails;
import com.hbu.hanbatbox.repository.BoxRepository;
import com.hbu.hanbatbox.service.DownloadResponseBuilder;
import com.hbu.hanbatbox.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
@Slf4j
public class S3Controller {

  private final S3Service s3Service;
  private final BoxRepository boxRepository;

  @PostMapping("/downloads/{id}")
  public ResponseEntity<?> downloads(@PathVariable("id") Long id, @RequestBody Password body) {
    S3FileDetails fileDetails = s3Service.downloadFile(id, body.password());
    HttpHeaders responseHeader = DownloadResponseBuilder.getResponseHeader(fileDetails.fileName(),
        fileDetails.size());
    log.warn("파일 다운로드 완료! (" + fileDetails.fileName() + ")");

    return new ResponseEntity<>(fileDetails.content(), responseHeader, HttpStatus.OK);
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Void> deleteFile(@PathVariable("id") Long id,
      @RequestParam String password) {
    if (!s3Service.validatePassword(id, password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
    }
    boxRepository.deleteById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
