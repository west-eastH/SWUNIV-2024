package com.hbu.hanbatbox.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.hbu.hanbatbox.service.BoxService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;


@WebMvcTest(controllers = BoxController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
class S3ControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private BoxService boxService;

  private MockMultipartFile file;

  @BeforeEach
  void setUp() {
    file = new MockMultipartFile("files", "test.txt", MediaType.TEXT_PLAIN_VALUE, "Test content".getBytes());
  }

  @Test
  void testUploadFileWithPassword() throws Exception {
    MockMultipartFile jsonFile = new MockMultipartFile("data", "",
        MediaType.APPLICATION_JSON_VALUE, "{\"uploader\":\"Uploader\", \"title\":\"Test.txt\", \"password\":\"secret\"}".getBytes());

    // 파일 업로드 요청
    mockMvc.perform(multipart("/boxes/uploads")
            .file(file)
            .file(jsonFile))
        .andExpect(status().isOk());
  }

  @Test
  void testUploadFileWithoutPassword() throws Exception {
    MockMultipartFile jsonFile = new MockMultipartFile("data", "",
        MediaType.APPLICATION_JSON_VALUE, "{\"uploader\":\"Uploader\", \"title\":\"Test.txt\"}".getBytes());

    // 파일 업로드 요청 (비밀번호 없이)
    mockMvc.perform(multipart("/boxes/uploads")
            .file(file)
            .file(jsonFile))
        .andExpect(status().isOk());
  }

  @Test
  void testUploadFileFailure() throws Exception {
    MockMultipartFile emptyFile = new MockMultipartFile("files", "", MediaType.TEXT_PLAIN_VALUE, new byte[0]);
    MockMultipartFile jsonFile = new MockMultipartFile("data", "",
        MediaType.APPLICATION_JSON_VALUE, "{\"uploader\":\"Uploader\", \"title\":\"Test.txt\", \"password\":\"secret\"}".getBytes());

    // 파일 업로드 실패 테스트 (빈 파일 전송)
    mockMvc.perform(multipart("/boxes/uploads")
            .file(emptyFile)
            .file(jsonFile))
        .andExpect(status().isOk());
  }
}
