package com.hbu.hanbatbox.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.transfer.s3.S3TransferManager;

@Configuration
public class S3TransferConfig {

  final
  S3AsyncClient s3AsyncClient;

  public S3TransferConfig(S3AsyncClient s3AsyncClient) {
    this.s3AsyncClient = s3AsyncClient;
  }

  @Bean
  public S3TransferManager S3TransferManager() {
    return S3TransferManager.builder().s3Client(s3AsyncClient).build();
  }
}
