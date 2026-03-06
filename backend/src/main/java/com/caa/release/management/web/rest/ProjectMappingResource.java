package com.caa.release.management.web.rest;

import com.caa.release.management.web.dto.ProjectMappingDTO;
import com.caa.release.management.service.ProjectMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/project-mappings")
@RequiredArgsConstructor
public class ProjectMappingResource {

    private final ProjectMappingService service;

    @GetMapping
    public List<ProjectMappingDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/cpr/{cprCode}")
    public List<ProjectMappingDTO> getByCprCode(@PathVariable String cprCode) {
        return service.findByCprCode(cprCode);
    }

    @PostMapping
    public ProjectMappingDTO save(@RequestBody ProjectMappingDTO dto) {
        return service.save(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
