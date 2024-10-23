package com.hbu.hanbatbox.repository;

import com.hbu.hanbatbox.domain.Box;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoxRepository extends JpaRepository<Box, Long> {
    List<Box> findTop5ByTitleContainingOrderByIdDesc(String title);
}
