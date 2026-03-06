package com.caa.release.management.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Entité représentant une Release.
 */
@Entity
@Table(name = "release_entity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Release {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String version;

    @Column(nullable = false)
    private String status;

    private String description;

    @Column(nullable = false)
    private String entity; // PREDICA, PACIFICA, CACI

    @Column(nullable = false)
    private String canal; // VERSION, CMA, HORS VERSION

    @ElementCollection
    @CollectionTable(name = "release_projects", joinColumns = @JoinColumn(name = "release_id"))
    @Column(name = "project_cpr")
    private List<String> projects;

    @ElementCollection
    @CollectionTable(name = "release_dates", joinColumns = @JoinColumn(name = "release_id"))
    @MapKeyColumn(name = "env_key")
    @Column(name = "env_date")
    private Map<String, String> dates;
}
