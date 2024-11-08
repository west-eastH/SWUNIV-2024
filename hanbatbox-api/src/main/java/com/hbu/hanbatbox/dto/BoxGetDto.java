package com.hbu.hanbatbox.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoxGetDto {

    private Long id;
    private String uploader;
    private String title;
    private Long fileSize;
    private boolean crypted;
    private LocalDateTime dateUploaded;
}