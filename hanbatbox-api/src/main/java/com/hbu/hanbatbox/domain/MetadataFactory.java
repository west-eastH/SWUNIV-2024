package com.hbu.hanbatbox.domain;

import java.util.HashMap;
import java.util.Map;

public class MetadataFactory {

  public static Map<String, String> create(String title) {
    HashMap<String, String> metadata = new HashMap<>();
    metadata.put("title", title);
    return metadata;
  }

}
