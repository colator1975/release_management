package com.caa.release.management.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

/**
 * Mapping d'un projet vers une application et un bloc.
 */
@Entity
@Table(name = "project_mapping")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectMapping {

    @Id
    private UUID id;

    @Column(name = "cpr_code", nullable = false)
    private String cprCode;

    @Column(nullable = false)
    private String bloc;

    @Column(nullable = false)
    private String application;

    @Column(nullable = false)
    private String status;

    private String state;

    @PrePersist
    public void ensureId() {
        if (id == null) {
            id = UUID.randomUUID();
        }
    }
}
