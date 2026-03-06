package com.caa.release.management.config;

import com.caa.release.management.domain.EligibilityForm;
import com.caa.release.management.domain.ProjectMapping;
import com.caa.release.management.repository.EligibilityFormRepository;
import com.caa.release.management.repository.ProjectMappingRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final EligibilityFormRepository eligibilityRepository;
    private final ProjectMappingRepository mappingRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        log.info("== Démarrage de l'initialisation des données ==");
        try {
            if (eligibilityRepository.count() == 0) {
                log.info("Table d'éligibilité vide. Tentative d'importation...");
                importEligibilityForms();
            } else {
                log.info("Table d'éligibilité déjà alimentée ({} dossiers).", eligibilityRepository.count());
            }

            if (mappingRepository.count() == 0) {
                log.info("Table de mapping vide. Tentative d'importation...");
                importMappings();
            } else {
                log.info("Table de mapping déjà alimentée ({} entrées).", mappingRepository.count());
            }
        } catch (Exception e) {
            log.error("Erreur critique lors de l'initialisation des données", e);
        }
        log.info("== Initialisation des données terminée ==");
    }

    private void importEligibilityForms() {
        File sourceFile = new File("C:/projets/Release-management/import_projets_converti.json");
        if (!sourceFile.exists()) {
            log.warn("Fichier source d'éligibilité introuvable : {}", sourceFile.getAbsolutePath());
            return;
        }

        try {
            List<Map<String, Object>> data = objectMapper.readValue(sourceFile,
                    new TypeReference<List<Map<String, Object>>>() {
                    });
            log.info("Lecture du fichier JSON réussie : {} dossiers trouvés.", data.size());

            for (Map<String, Object> item : data) {
                String cprCode = (String) item.get("cprCode");
                String entity = (String) item.get("entity");
                Object formDataObj = item.get("formData");
                String formDataJson = objectMapper.writeValueAsString(formDataObj);

                EligibilityForm form = EligibilityForm.builder()
                        .cprCode(cprCode)
                        .entity(entity)
                        .formData(formDataJson)
                        .build();
                eligibilityRepository.save(form);
            }
            log.info("Importation Eligibility terminée avec succès.");
        } catch (IOException e) {
            log.error("Erreur d'importation Eligibility", e);
        }
    }

    private void importMappings() {
        File sourceFile = new File("C:/projets/Release-management/import_projets_converti.json");
        if (!sourceFile.exists())
            return;

        try {
            List<Map<String, Object>> data = objectMapper.readValue(sourceFile,
                    new TypeReference<List<Map<String, Object>>>() {
                    });
            for (Map<String, Object> item : data) {
                String cprCode = (String) item.get("cprCode");
                @SuppressWarnings("unchecked")
                Map<String, Object> formData = (Map<String, Object>) item.get("formData");

                if (formData == null)
                    continue;

                String bloc = (String) formData.getOrDefault("Quel est le bloc applicatif principal ? ", "N/A");
                String nomProjet = (String) formData.getOrDefault("Quel est le nom du projet ? ", cprCode);

                ProjectMapping mapping = ProjectMapping.builder()
                        .cprCode(cprCode)
                        .bloc(bloc)
                        .application(nomProjet)
                        .status("USED")
                        .state("OK")
                        .build();
                mappingRepository.save(mapping);
            }
            log.info("Importation Mappings terminée avec succès.");
        } catch (IOException e) {
            log.error("Erreur d'importation Mappings", e);
        }
    }
}
