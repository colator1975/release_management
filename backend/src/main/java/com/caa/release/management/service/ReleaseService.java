package com.caa.release.management.service;

import com.caa.release.management.domain.Release;
import com.caa.release.management.repository.ReleaseRepository;
import com.caa.release.management.web.dto.ReleaseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReleaseService {

    private final ReleaseRepository repository;

    public List<ReleaseDTO> findAll() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ReleaseDTO findById(UUID id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Release non trouvée"));
    }

    @Transactional
    public ReleaseDTO save(ReleaseDTO dto) {
        Release entity = repository.findById(dto.id() != null ? dto.id() : UUID.randomUUID())
                .orElse(new Release());

        entity.setName(dto.name());
        entity.setVersion(dto.version());
        entity.setStatus(dto.status());
        entity.setDescription(dto.description());
        entity.setEntity(dto.entity());
        entity.setCanal(dto.canal());
        entity.setProjects(dto.projects());
        entity.setDates(dto.dates());

        return toDTO(repository.save(entity));
    }

    @Transactional
    public void delete(UUID id) {
        repository.deleteById(id);
    }

    private ReleaseDTO toDTO(Release entity) {
        return new ReleaseDTO(
                entity.getId(),
                entity.getName(),
                entity.getVersion(),
                entity.getStatus(),
                entity.getDescription(),
                entity.getEntity(),
                entity.getCanal(),
                entity.getProjects(),
                entity.getDates());
    }
}
