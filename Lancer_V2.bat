@echo off
echo ==========================================
echo   Lancement de Release Management V2
echo ==========================================

echo [1/2] Demarrage du Backend Spring Boot...
:: Utilisation du wrapper Maven pour plus de fiabilite
start cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo [2/2] Demarrage du Frontend Next.js...
start cmd /k "cd frontend && npm run dev"

echo Application disponible sur:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:8080/api
echo ==========================================
