package com.caa.release.management.service;

import com.caa.release.management.domain.EligibilityForm;
import com.caa.release.management.repository.EligibilityFormRepository;
import com.caa.release.management.web.dto.EligibilityFormDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EligibilityFormService {

    private final EligibilityFormRepository repository;
    private final ObjectMapper objectMapper;

    public List<EligibilityFormDTO> findAll() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<EligibilityFormDTO> findByCprCode(String cprCode) {
        return repository.findByCprCode(cprCode).map(this::toDTO);
    }

    @Transactional
    public EligibilityFormDTO save(EligibilityFormDTO dto) {
        EligibilityForm entity = repository.findByCprCode(dto.cprCode())
                .orElse(new EligibilityForm());

        entity.setCprCode(dto.cprCode());
        entity.setEntity(dto.entity());
        entity.setFormData(toJson(dto.formData()));

        return toDTO(repository.save(entity));
    }

    private EligibilityFormDTO toDTO(EligibilityForm entity) {
        return new EligibilityFormDTO(
                entity.getId(),
                entity.getCprCode(),
                entity.getEntity(),
                fromJson(entity.getFormData()),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }

    private String toJson(Map<String, Object> data) {
        try {
            return objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Erreur lors de la sérialisation JSON", e);
        }
    }

    private Map<String, Object> fromJson(String json) {
        if (json == null || json.isEmpty())
            return Map.of();
        try {
            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Erreur lors de la désérialisation JSON", e);
        }
    }
}
