package com.caa.release.management.web.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * DTO pour une Release.
 */
public record ReleaseDTO(
    UUID id,
    String name,
    String version,
    String status,
    String description,
    String entity,
    String canal,
    List<String> projects,
    Map<String, String> dates
) {}
