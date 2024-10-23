package com.hbu.hanbatbox.repository;

import com.hbu.hanbatbox.domain.Box;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoxRepository extends JpaRepository<Box, Long> {

    List<Box> findTop5ByUploaderOrderByIdDesc(String uploader);

    List<Box> findTop5ByUploaderAndIdLessThanOrderByIdDesc(String uploader, Long id);

    List<Box> findTop5ByTitleContainingOrderByIdDesc(String title);

    List<Box> findTop5ByTitleContainingAndIdLessThanOrderByIdDesc(String title, Long id);

    @Query("SELECT b FROM Box as b WHERE (:id is null or b.id < :id) ORDER BY b.id DESC LIMIT 10")
    List<Box> findByCursor(@Param("id") Long id);

    @Query("SELECT b.id FROM Box as b WHERE b.id = :currentId - 1")
    Long getNextId(@Param("currentId") Long id);
}
