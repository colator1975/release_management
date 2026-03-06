package com.caa.release.management.web.dto;

import java.util.UUID;

/**
 * DTO pour la configuration des couloirs de livraison.
 */
public record DeliveryLaneConfigDTO(
    UUID id,
    String entity,
    String laneName,
    String subLaneId,
    String devBouchonne,
    String devIntegre,
    String accostage,
    String qualFonct,
    String homolEntite,
    String homolDistrib,
    String preProd,
    String prod
) {}
