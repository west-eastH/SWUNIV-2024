package com.hbu.hanbatbox.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IpCheckController {

    public record AccessAllowed(boolean accessible) {

    }

    private boolean isIpAllowed(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        return clientIp.startsWith("223.194.160.") || clientIp.equals("127.0.0.1")
            || clientIp.equals("125.242.221.200") || clientIp.equals("175.119.50.176")
            || clientIp.equals("::1") || clientIp.equals("0:0:0:0:0:0:0:1");
    }

    @GetMapping("/check-ip")
    public ResponseEntity<AccessAllowed> checkClientIp(HttpServletRequest request) {
        boolean isAllowed = isIpAllowed(request);
        return ResponseEntity.ok(new AccessAllowed(isAllowed));
    }
}