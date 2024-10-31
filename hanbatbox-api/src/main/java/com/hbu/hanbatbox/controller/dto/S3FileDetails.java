package com.hbu.hanbatbox.controller.dto;

public record S3FileDetails(String fileName, long size, byte[] content) {}
