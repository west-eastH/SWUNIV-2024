package com.hbu.hanbatbox.service;

import static com.hbu.hanbatbox.domain.Box.createBox;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.hbu.hanbatbox.domain.Box;
import com.hbu.hanbatbox.dto.BoxGetDto;
import com.hbu.hanbatbox.repository.BoxRepository;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(BoxService.class)
public class BoxServiceTest {

    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private BoxService boxService;

    @AfterEach
    public void cleanUp() {
        boxRepository.deleteAll();
    }

    @TestConfiguration
    static class TestConfig {

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }

    @Test
    @Rollback(value = false)
    public void saveBoxesTest() {
        Box box1 = createBox("Uploader1", "Title1", "password1", null, false);
        Box box2 = createBox("Uploader2", "Title2", "password2", null, true);

        boxRepository.save(box1);
        boxRepository.save(box2);

        List<Box> boxes = boxRepository.findAll();

        assertEquals(2, boxes.size());
        assertEquals("Uploader1", boxes.get(0).getUploader());
    }

    @Test
    public void noCursorTest() {
        // Given
        Box box1 = createBox("Uploader1", "Title1", "password1", "500MB", false);
        Box box2 = createBox("Uploader2", "Title2", "password2", "1GB", true);

        boxRepository.save(box1);
        boxRepository.save(box2);

        // When
        List<BoxGetDto> result = boxService.searchBoxes("", null, null);

        // Then
        assertEquals(2, result.size());
        assertEquals("Uploader2", result.get(0).getUploader());
        assertEquals("Title1", result.get(1).getTitle());
    }

    @Test
    public void cursorTest() {
        // Given
        for (int i = 1; i <= 10; i++) {
            Box box = createBox("Uploader" + i, "Title" + i, "password" + i, i * 100 + "MB", false);
            boxRepository.save(box);
        }

        Box box = boxRepository.findTop5ByTitleContainingOrderByIdDesc("").get(4);

        // When
        List<BoxGetDto> result = boxService.searchBoxes("", null, null);

        // Then
        assertEquals(5, result.size());
        assertEquals("Uploader10", result.get(0).getUploader());
        assertEquals("Uploader9", result.get(1).getUploader());
    }
}