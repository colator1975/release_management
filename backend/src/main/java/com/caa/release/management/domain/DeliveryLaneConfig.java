package com.caa.release.management.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

/**
 * Configuration des couloirs de livraison.
 */
@Entity
@Table(name = "delivery_lane_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryLaneConfig {

    @Id
    private UUID id;

    @Column(nullable = false)
    private String entity;

    @Column(name = "lane_name", nullable = false)
    private String laneName;

    @Column(name = "sub_lane_id")
    private String subLaneId;

    @Column(name = "dev_bouchonne")
    private String devBouchonne;

    @Column(name = "dev_integre")
    private String devIntegre;

    private String accostage;

    @Column(name = "qual_fonct")
    private String qualFonct;

    @Column(name = "homol_entite")
    private String homolEntite;

    @Column(name = "homol_distrib")
    private String homolDistrib;

    @Column(name = "pre_prod")
    private String preProd;

    private String prod;

    @PrePersist
    public void ensureId() {
        if (id == null) {
            id = UUID.randomUUID();
        }
    }
}
