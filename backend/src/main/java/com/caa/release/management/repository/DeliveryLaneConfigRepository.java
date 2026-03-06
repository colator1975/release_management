package com.caa.release.management.repository;

import com.caa.release.management.domain.DeliveryLaneConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface DeliveryLaneConfigRepository extends JpaRepository<DeliveryLaneConfig, UUID> {
    List<DeliveryLaneConfig> findByEntity(String entity);
}
