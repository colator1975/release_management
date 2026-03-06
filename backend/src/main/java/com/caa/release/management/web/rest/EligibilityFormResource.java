package com.caa.release.management.web.rest;

import com.caa.release.management.web.dto.EligibilityFormDTO;
import com.caa.release.management.service.EligibilityFormService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eligibility-forms")
@RequiredArgsConstructor
public class EligibilityFormResource {

    private final EligibilityFormService service;

    @GetMapping
    public List<EligibilityFormDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/{cprCode}")
    public ResponseEntity<EligibilityFormDTO> getByCprCode(@PathVariable String cprCode) {
        return service.findByCprCode(cprCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EligibilityFormDTO save(@RequestBody EligibilityFormDTO dto) {
        return service.save(dto);
    }
}
