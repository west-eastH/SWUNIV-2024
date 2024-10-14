package com.hbu.hanbatbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result<T> {

    private int status;
    private String message;
    private T files;
}
