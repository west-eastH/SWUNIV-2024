package com.hbu.hanbatbox.controller;

import com.hbu.hanbatbox.dto.BoxGetDto;
import com.hbu.hanbatbox.dto.BoxSaveDto;
import com.hbu.hanbatbox.dto.Result;
import com.hbu.hanbatbox.service.BoxService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BoxController {

    private final BoxService boxService;


    private boolean isIpAllowed(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();

        return clientIp.startsWith("223.194.160.") || clientIp.equals("127.0.0.1")
            || clientIp.equals("::1") || clientIp.equals("0:0:0:0:0:0:0:1");
    }

    @GetMapping("/boxes")
    public ResponseEntity<?> getAllBoxes(
        HttpServletRequest request,
        @RequestParam(required = false) Long cursor,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String type) {

        if (!isIpAllowed(request)) {
            return ResponseEntity.status(400).body("The IP address is not allowed.");
        }

        List<BoxGetDto> boxes = boxService.searchBoxes(keyword, type, cursor);
        return ResponseEntity.ok(new Result<>(200, "Success", boxes));
    }

    @PostMapping("/boxes")
    public ResponseEntity<?> createBox(HttpServletRequest request, @RequestBody BoxSaveDto boxDto) {
        if (!isIpAllowed(request)) {
            return ResponseEntity.status(400).body("The IP address is not allowed.");
        }

        boxService.saveBox(boxDto);
        return ResponseEntity.ok("Box created successfully");
    }
}
