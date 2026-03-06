package com.caa.release.management.web.rest;

import com.caa.release.management.web.dto.DeliveryLaneConfigDTO;
import com.caa.release.management.service.DeliveryLaneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/delivery-configs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // À affiner plus tard
public class DeliveryLaneResource {

    private final DeliveryLaneService service;

    @GetMapping
    public List<DeliveryLaneConfigDTO> getAll() {
        return service.getAllConfigs();
    }

    @GetMapping("/{entity}")
    public List<DeliveryLaneConfigDTO> getByEntity(@PathVariable String entity) {
        return service.getConfigsByEntity(entity);
    }

    @PutMapping("/batch")
    public List<DeliveryLaneConfigDTO> updateBatch(@RequestBody List<DeliveryLaneConfigDTO> configs) {
        return service.saveBatch(configs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.deleteConfig(id);
        return ResponseEntity.noContent().build();
    }
}
