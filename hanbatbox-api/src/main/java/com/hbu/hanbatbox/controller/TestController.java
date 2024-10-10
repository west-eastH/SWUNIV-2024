package com.hbu.hanbatbox.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

  @GetMapping
  public String getClientIp(HttpServletRequest request) {
    String clientIp = request.getRemoteAddr();

    if (clientIp.startsWith("223.194.160.")) {
      return "학교 네트워크 IP: " + clientIp;
    } else if (clientIp.equals("127.0.0.1") || clientIp.equals("::1")) {
      return "로컬 네트워크 IP: " + clientIp;
    } else {
      return "외부 네트워크 IP: " + clientIp;
    }
  }
}
