package com.hbu.hanbatbox.repository;

import com.hbu.hanbatbox.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
