package com.hbu.hanbatbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoxSaveDto {

    private String uploader;
    private String title;
    private String password;
}


