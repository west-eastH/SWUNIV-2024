package com.hbu.hanbatbox.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "box_id")
    private Box box;

    private String objectKey;

    public static Item createItem(String objectKey) {
        Item item = new Item();
        item.objectKey = objectKey;
        return item;
    }

  protected void setBox(Box box) {
    this.box = box;
  }
}
