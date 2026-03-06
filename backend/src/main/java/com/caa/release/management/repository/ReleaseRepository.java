package com.caa.release.management.repository;

import com.caa.release.management.domain.Release;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface ReleaseRepository extends JpaRepository<Release, UUID> {
}
