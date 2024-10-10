package com.hbu.hanbatbox.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class HanbatExceptionHandler extends RuntimeException {
    public HanbatExceptionHandler() {
        super();
    }

    public HanbatExceptionHandler(String message) {
        super(message);
    }

    public ResponseEntity<String> throwServerException()
    {
        return new ResponseEntity<>(super.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
