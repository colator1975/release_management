package com.caa.release.management.web.dto;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

/**
 * DTO pour le formulaire d'éligibilité.
 */
public record EligibilityFormDTO(
    UUID id,
    String cprCode,
    String entity,
    Map<String, Object> formData,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
