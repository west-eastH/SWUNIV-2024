package com.hbu.hanbatbox.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "files")
public class StoredFile {

    @Id
    @GeneratedValue
    @Column(name = "file_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "box_id")
    private Box box;

    private String objectKey;

    public static StoredFile createStoredFile(String objectKey) {
        StoredFile storedFile = new StoredFile();
        storedFile.objectKey = objectKey;
        return storedFile;
    }

  protected void setBox(Box box) {
    this.box = box;
  }
}
