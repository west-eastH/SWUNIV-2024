package com.hbu.hanbatbox;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.util.TimeZone;

@SpringBootApplication
@EnableAspectJAutoProxy
public class HanbatboxApplication {

  public static void main(String[] args) {
    SpringApplication.run(HanbatboxApplication.class, args);
  }

  @PostConstruct
  public void changeTimezone() {
    TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
  }
}
