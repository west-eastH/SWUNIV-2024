package com.hbu.hanbatbox.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.hbu.hanbatbox.service.S3Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;


@WebMvcTest(S3Controller.class)
public class S3ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private S3Service s3Service;

    private MockMultipartFile file;

    @BeforeEach
    void setUp() {
        file = new MockMultipartFile("file", "test.txt", MediaType.TEXT_PLAIN_VALUE, "Test content".getBytes());
    }

    @Test
    public void testUploadFileWithPassword() throws Exception {
        String title = "Test.txt";
        String password = "secret";

        // 파일 업로드 요청 보내기
        mockMvc.perform(multipart("/file/upload")
                .file(file).param("title", title).param("password", password))
                .andExpect(status().isOk())
                .andExpect(content().string("File uploaded successfully!"));
    }

    @Test
    public void testUploadFileWithoutPassword() throws Exception {
        String title = "Test.txt";

        // 파일 업로드 요청 보내기
        mockMvc.perform(multipart("/file/upload")
                .file(file).param("title", title))
                .andExpect(status().isOk())
                .andExpect(content().string("File uploaded successfully!"));
    }

    @Test
    public void testUploadFileFailure() throws Exception {
        String title = "Test.txt";
        String password = "secret";

        // 비어 있는 파일 생성
        MockMultipartFile emptyFile = new MockMultipartFile("file", "", MediaType.TEXT_PLAIN_VALUE, new byte[0]);

        // 파일 업로드 요청 보내기
        mockMvc.perform(multipart("/file/upload")
                .file(emptyFile).param("title", title).param("password", password))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("File upload failed!"));
    }
}
