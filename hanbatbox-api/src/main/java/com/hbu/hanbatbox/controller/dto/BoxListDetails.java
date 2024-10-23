package com.hbu.hanbatbox.controller.dto;

import com.hbu.hanbatbox.dto.BoxGetDto;

import java.util.List;

public record BoxListDetails(
    List<BoxGetDto> boxes,
    Long nextCursorId
) {}
