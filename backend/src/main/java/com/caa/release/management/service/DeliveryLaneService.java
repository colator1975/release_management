package com.caa.release.management.service;

import com.caa.release.management.domain.DeliveryLaneConfig;
import com.caa.release.management.repository.DeliveryLaneConfigRepository;
import com.caa.release.management.web.dto.DeliveryLaneConfigDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DeliveryLaneService {

    private final DeliveryLaneConfigRepository repository;

    public List<DeliveryLaneConfigDTO> getAllConfigs() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<DeliveryLaneConfigDTO> getConfigsByEntity(String entity) {
        return repository.findByEntity(entity).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteConfig(UUID id) {
        repository.deleteById(id);
    }

    @Transactional
    public List<DeliveryLaneConfigDTO> saveBatch(List<DeliveryLaneConfigDTO> dtos) {
        // Dans une implémentation réelle, on pourrait vouloir faire un merge
        // intelligent
        // Ici on suit la logique précédente : enregistrement en masse
        List<DeliveryLaneConfig> entities = dtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());

        return repository.saveAll(entities).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private DeliveryLaneConfigDTO toDTO(DeliveryLaneConfig entity) {
        return new DeliveryLaneConfigDTO(
                entity.getId(),
                entity.getEntity(),
                entity.getLaneName(),
                entity.getSubLaneId(),
                entity.getDevBouchonne(),
                entity.getDevIntegre(),
                entity.getAccostage(),
                entity.getQualFonct(),
                entity.getHomolEntite(),
                entity.getHomolDistrib(),
                entity.getPreProd(),
                entity.getProd());
    }

    private DeliveryLaneConfig toEntity(DeliveryLaneConfigDTO dto) {
        return DeliveryLaneConfig.builder()
                .id(dto.id())
                .entity(dto.entity())
                .laneName(dto.laneName())
                .subLaneId(dto.subLaneId())
                .devBouchonne(dto.devBouchonne())
                .devIntegre(dto.devIntegre())
                .accostage(dto.accostage())
                .qualFonct(dto.qualFonct())
                .homolEntite(dto.homolEntite())
                .homolDistrib(dto.homolDistrib())
                .preProd(dto.preProd())
                .prod(dto.prod())
                .build();
    }
}
