package com.hbu.hanbatbox.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Box {

    @Id
    @GeneratedValue
    @Column(name = "box_id")
    private Long id;

    private String uploader;

    private String title;

    private String password;

    @OneToMany(mappedBy = "box", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items = new ArrayList<>();

    public static Box createBox(String uploader, String title, String password,
        Item... items) {
        Box box = new Box();
        box.uploader = uploader;
        box.title = title;
        box.password = password;
        for (Item item : items) {
            box.addItem(item);
        }
        return box;
    }

    public void addItem(Item item) {
        items.add(item);
        item.setBox(this);
    }

    public void removeItem(Item item) {
        items.remove(item);
        item.setBox(null);
    }
}
