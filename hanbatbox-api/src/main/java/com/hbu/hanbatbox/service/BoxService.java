package com.hbu.hanbatbox.service;

import com.hbu.hanbatbox.domain.Box;
import com.hbu.hanbatbox.dto.BoxDto;
import com.hbu.hanbatbox.repository.BoxRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class BoxService {

    private final BoxRepository boxRepository;

    public List<BoxDto> getBoxes(Long cursor) {
        List<Box> boxes;

        if (cursor == null) {
            boxes = boxRepository.findTop5ByOrderByIdDesc();
        } else {
            boxes = boxRepository.findTop5ByIdLessThanOrderByIdDesc(cursor);
        }

        return boxes.stream().map(box -> new BoxDto(
            box.getId(),
            box.getUploader(),
            box.getTitle(),
            box.getPassword(),
            box.getFileSize(),
            box.isCrypted()
        )).collect(Collectors.toList());
    }

    public void saveBox(BoxDto boxDto) {
        Box box = Box.createBox(
            boxDto.getUploader(),
            boxDto.getTitle(),
            boxDto.getPassword(),
            boxDto.getFileSize(),
            boxDto.isCrypted()
        );
        boxRepository.save(box);
    }
}
