package com.hbu.hanbatbox.service;

import com.hbu.hanbatbox.controller.dto.BoxListDetails;
import com.hbu.hanbatbox.domain.Box;
import com.hbu.hanbatbox.domain.Item;
import com.hbu.hanbatbox.dto.BoxGetDto;
import com.hbu.hanbatbox.dto.BoxSaveDto;
import com.hbu.hanbatbox.repository.BoxRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoxService {

    private final BoxRepository boxRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Service s3Service;
    private final EntityManager entityManager;

    long startTime;
    long endTime;

    public BoxListDetails searchBoxes(String keyword, String type, Long cursor) {
        if (Objects.nonNull(cursor) && cursor == -1L) {
            return new BoxListDetails(new ArrayList<>(), -1L);
        }

        List<Box> boxes = search(cursor, type, keyword);
        Long nextCursorId = getNextCursorId(boxes);

        List<BoxGetDto> collect = boxes.stream().map(
            box -> new BoxGetDto(box.getId(), box.getUploader(), box.getTitle(), box.getFileSize(),
                box.isCrypted(), box.getDateUploaded())).collect(Collectors.toList());

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

          String objectKey = null;
          try {
            objectKey = s3Service.uploadFileAndGetObjectKey(boxDto.getTitle(), file);
          } catch (IOException e) {
            throw new RuntimeException(e);
          }

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

    private List<Box> search(Long cursor, String type, String keyword) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Box> query = builder.createQuery(Box.class);
        Root<Box> root = query.from(Box.class);

        List<Predicate> predicates = new ArrayList<>();

        if (cursor != null) {
            predicates.add(builder.lessThan(root.get("id"), cursor));
        }
        if ("nickname".equals(type) && keyword != null) {
            predicates.add(builder.like(root.get("uploader"), keyword + "%"));
        }
        if ("title".equals(type) && keyword != null) {
            predicates.add(builder.like(root.get("title"), keyword + "%"));
        }

        query.select(root)
            .where(builder.and(predicates.toArray(new Predicate[0])))
            .orderBy(builder.desc(root.get("id")));

        return entityManager.createQuery(query)
            .setMaxResults(10)
            .getResultList();
    }
}
