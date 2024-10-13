package com.hbu.hanbatbox.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IpCheckController {
    private boolean isIpAllowed(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();

        return clientIp.startsWith("223.194.160.") || clientIp.equals("127.0.0.1")
            || clientIp.equals("::1") || clientIp.equals("0:0:0:0:0:0:0:1");
    }

    @GetMapping("/check-ip")
    public ResponseEntity<String> checkClientIp(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();

        if (isIpAllowed(request)) {
            return ResponseEntity.ok("Allowed IP: " + clientIp);
        } else {
            return ResponseEntity.status(400).body("The IP address is not allowed.");
        }
    }
}
