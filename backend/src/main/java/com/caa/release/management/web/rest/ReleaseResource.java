package com.caa.release.management.web.rest;

import com.caa.release.management.web.dto.ReleaseDTO;
import com.caa.release.management.service.ReleaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/releases")
@RequiredArgsConstructor
public class ReleaseResource {

    private final ReleaseService service;

    @GetMapping
    public List<ReleaseDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReleaseDTO> getById(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(service.findById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ReleaseDTO save(@RequestBody ReleaseDTO dto) {
        return service.save(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
