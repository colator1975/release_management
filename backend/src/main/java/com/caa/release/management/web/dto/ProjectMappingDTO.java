package com.caa.release.management.web.dto;

import java.util.UUID;

/**
 * DTO pour le mapping projet.
 */
public record ProjectMappingDTO(
    UUID id,
    String cprCode,
    String bloc,
    String application,
    String status,
    String state
) {}
