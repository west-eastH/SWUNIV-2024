package com.hbu.hanbatbox.controller;

import com.hbu.hanbatbox.controller.annotation.MultipartMapping;
import com.hbu.hanbatbox.controller.dto.BoxCreation;
import com.hbu.hanbatbox.dto.BoxGetDto;
import com.hbu.hanbatbox.dto.Result;
import com.hbu.hanbatbox.service.BoxService;
import com.hbu.hanbatbox.service.S3Service;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/boxes")
public class BoxController {

  private final BoxService boxService;
  private final S3Service s3Service;

  @GetMapping
  public ResponseEntity<Result<List<BoxGetDto>>> getAllBoxes(
      @RequestParam(required = false) Long cursor,
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) String type) {

    List<BoxGetDto> boxes = boxService.searchBoxes(keyword, type, cursor);
    return ResponseEntity.ok(new Result<>(200, "Success", boxes));
  }

  @MultipartMapping("/boxes")
  public ResponseEntity<String> createBox(@ModelAttribute BoxCreation creation) {
    s3Service.uploads("", creation.files());
//    boxService.saveBox(boxDto);
    return ResponseEntity.ok("Box created successfully");
  }
}
