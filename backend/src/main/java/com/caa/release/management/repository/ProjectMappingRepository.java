package com.caa.release.management.repository;

import com.caa.release.management.domain.ProjectMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectMappingRepository extends JpaRepository<ProjectMapping, UUID> {
    List<ProjectMapping> findByCprCode(String cprCode);
}
