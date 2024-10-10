package com.hbu.hanbatbox.repository;

import com.hbu.hanbatbox.domain.StoredFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoredFileRepository extends JpaRepository<StoredFile, Long> {

}
