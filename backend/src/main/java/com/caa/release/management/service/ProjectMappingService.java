package com.caa.release.management.service;

import com.caa.release.management.domain.ProjectMapping;
import com.caa.release.management.repository.ProjectMappingRepository;
import com.caa.release.management.web.dto.ProjectMappingDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectMappingService {

    private final ProjectMappingRepository repository;

    public List<ProjectMappingDTO> findAll() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectMappingDTO> findByCprCode(String cprCode) {
        return repository.findByCprCode(cprCode).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProjectMappingDTO save(ProjectMappingDTO dto) {
        ProjectMapping entity = toEntity(dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public void delete(UUID id) {
        repository.deleteById(id);
    }

    private ProjectMappingDTO toDTO(ProjectMapping entity) {
        return new ProjectMappingDTO(
                entity.getId(),
                entity.getCprCode(),
                entity.getBloc(),
                entity.getApplication(),
                entity.getStatus(),
                entity.getState());
    }

    private ProjectMapping toEntity(ProjectMappingDTO dto) {
        return ProjectMapping.builder()
                .id(dto.id())
                .cprCode(dto.cprCode())
                .bloc(dto.bloc())
                .application(dto.application())
                .status(dto.status())
                .state(dto.state())
                .build();
    }
}
