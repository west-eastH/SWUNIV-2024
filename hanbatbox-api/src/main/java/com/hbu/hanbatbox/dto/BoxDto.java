package com.hbu.hanbatbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoxDto {

    private Long id;
    private String uploader;
    private String title;
    private String password;
    private String fileSize;
    private boolean crypted;
}