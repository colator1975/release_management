package com.caa.release.management.repository;

import com.caa.release.management.domain.EligibilityForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EligibilityFormRepository extends JpaRepository<EligibilityForm, UUID> {
    Optional<EligibilityForm> findByCprCode(String cprCode);
}
