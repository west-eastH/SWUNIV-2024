package com.hbu.hanbatbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class HanbatboxApplication {
  public static void main(String[] args) {
    SpringApplication.run(HanbatboxApplication.class, args);
  }
}