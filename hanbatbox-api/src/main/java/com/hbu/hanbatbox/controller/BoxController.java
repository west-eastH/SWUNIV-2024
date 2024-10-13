package com.hbu.hanbatbox.controller;

import com.hbu.hanbatbox.dto.BoxGetDto;
import com.hbu.hanbatbox.dto.BoxSaveDto;
import com.hbu.hanbatbox.dto.Result;
import com.hbu.hanbatbox.service.BoxService;
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

    @GetMapping("/boxes")
    public ResponseEntity<Result<List<BoxGetDto>>> getAllBoxes(
        @RequestParam(required = false) Long cursor) {

        List<BoxGetDto> boxes = boxService.getBoxes(cursor);
        return ResponseEntity.ok(new Result<>(200, "Success", boxes));
    }

    @PostMapping("/boxes")
    public ResponseEntity<String> createBox(@RequestBody BoxSaveDto boxDto) {
        boxService.saveBox(boxDto);
        return ResponseEntity.ok("Box created successfully");
    }
}
