package com.hbu.hanbatbox.controller.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record BoxCreation(
    String title,
    String password,
    String uploader,
    List<MultipartFile> files
) {
}
