package com.hbu.hanbatbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoxGetDto {

    private Long id;
    private String uploader;
    private String title;
    private String fileSize;
    private boolean crypted;
}