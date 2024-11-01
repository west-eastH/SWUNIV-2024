package com.hbu.hanbatbox.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class DownloadResponseBuilder {

  public static org.springframework.http.HttpHeaders getResponseHeader(String title, long size) {
    HttpHeaders headers = new HttpHeaders();
    String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);

    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentLength(size);
    headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + encodedTitle);
    headers.add("Content-Transfer-Encoding", "binary");

    return headers;
  }

}
