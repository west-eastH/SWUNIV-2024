package com.hbu.hanbatbox.service;

import com.hbu.hanbatbox.controller.dto.BoxListDetails;
import com.hbu.hanbatbox.domain.Box;
import com.hbu.hanbatbox.domain.Item;
import com.hbu.hanbatbox.dto.BoxGetDto;
import com.hbu.hanbatbox.dto.BoxSaveDto;
import com.hbu.hanbatbox.repository.BoxRepository;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class BoxService {

    private final BoxRepository boxRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Service s3Service;

    public BoxListDetails searchBoxes(String keyword, String type, Long cursor) {
        List<Box> boxes = new ArrayList<>();
        Long nextCursorId = null;
        System.out.println("keyword: " + keyword + " cursor: " + cursor);

        if (Objects.nonNull(cursor) && cursor == -1L) {
            return new BoxListDetails(new ArrayList<>(), -1L);
        }

        if (type == null) {
            boxes = boxRepository.findByCursor(cursor);
            nextCursorId = getNextCursorId(boxes);
        }

        if ("nickname".equalsIgnoreCase(type)) {
            if (cursor == null) {
                boxes = boxRepository.findTop5ByUploaderOrderByIdDesc(keyword);
                nextCursorId = getNextCursorId(boxes);
            } else {
                boxes = boxRepository.findTop5ByUploaderAndIdLessThanOrderByIdDesc(keyword, cursor);
                nextCursorId = getNextCursorId(boxes);
            }
        }

        if ("title".equalsIgnoreCase(type)) {
            if (cursor == null) {
                boxes = boxRepository.findTop5ByTitleContainingOrderByIdDesc(keyword);
            } else {
                boxes = boxRepository.findTop5ByTitleContainingAndIdLessThanOrderByIdDesc(keyword,
                    cursor);
            }
        }

        List<BoxGetDto> collect = boxes.stream().map(
            box -> new BoxGetDto(box.getId(), box.getUploader(), box.getTitle(), box.getFileSize(),
                box.isCrypted())).collect(Collectors.toList());

        return new BoxListDetails(collect, nextCursorId);
    }

    public Long saveBoxWithItems(BoxSaveDto boxDto, List<MultipartFile> files) {
        String encodedPassword = null;
        boolean isCrypted = false;

        if (boxDto.getPassword() != null && !boxDto.getPassword().isEmpty()) {
            encodedPassword = passwordEncoder.encode(boxDto.getPassword());
            isCrypted = true;
        }

        Box box = Box.createBox(boxDto.getUploader(), boxDto.getTitle(), encodedPassword,
            isCrypted);

        files.forEach(file -> {

            String objectKey = s3Service.uploadFileAndGetObjectKey(boxDto.getTitle(), file);

            Item item = Item.createItem(objectKey);
            box.addItem(item, file.getSize());
        });

        boxRepository.save(box);

        return box.getId();
    }

    private Long getNextCursorId(List<Box> boxes) {
        if (boxes.isEmpty()) return null;
        Long nextCursor = boxes.getLast().getId();
        return nextCursor == null ? -1 : nextCursor;
    }
}
