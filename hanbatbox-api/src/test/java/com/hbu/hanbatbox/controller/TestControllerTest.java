package com.hbu.hanbatbox.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TestControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void testAllowedSchoolIp() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/test")
						.with(request -> {
							request.setRemoteAddr("223.194.160.52");
							return request;
						}))
				.andExpect(status().isOk());
	}

	@Test
	void testBlockedExternalIp() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/test")
						.with(request -> {
							request.setRemoteAddr("8.8.8.8");
							return request;
						}))
				.andExpect(status().isForbidden());
	}

	@Test
	void testLocalhostIp() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/test")
						.with(request -> {
							request.setRemoteAddr("127.0.0.1");
							return request;
						}))
				.andExpect(status().isOk());
	}

	@Test
	void testIPv6LocalhostIp() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/test")
						.with(request -> {
							request.setRemoteAddr("::1");
							return request;
						}))
				.andExpect(status().isOk());
	}
}
