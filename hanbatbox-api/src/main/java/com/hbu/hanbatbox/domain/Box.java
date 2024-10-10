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
    private List<StoredFile> files = new ArrayList<>();

    public static Box createBox(String uploader, String title, String password,
        StoredFile... storedFiles) {
        Box box = new Box();
        box.uploader = uploader;
        box.title = title;
        box.password = password;
        for (StoredFile storedFile : storedFiles) {
            box.addFile(storedFile);
        }
        return box;
    }

    public void addFile(StoredFile file) {
        files.add(file);
        file.setBox(this);
    }

    public void removeFile(StoredFile file) {
        files.remove(file);
        file.setBox(null);
    }
}
