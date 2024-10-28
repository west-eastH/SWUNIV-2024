package com.hbu.hanbatbox.repository;

import com.hbu.hanbatbox.domain.Box;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoxRepository extends JpaRepository<Box, Long> {
    List<Box> findTop5ByTitleContainingOrderByIdDesc(String title);
}
