$MavenUrl = "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip"
$JdkUrl = "https://aka.ms/download-jdk/microsoft-jdk-17.0.10-windows-x64.zip"

$DistDir = ".dist"
New-Item -ItemType Directory -Force -Path $DistDir | Out-Null

# Setup Maven
$MavenZip = "$DistDir\maven.zip"
$MavenDistDir = "$DistDir\maven"

if (-not (Test-Path $MavenDistDir)) {
    Write-Host "Downloading Maven..."
    Invoke-WebRequest -Uri $MavenUrl -OutFile $MavenZip
    
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $MavenZip -DestinationPath $MavenDistDir -Force
    
    # Flatten the folder if needed, or just adjust path later
    # Typically unzips to "apache-maven-3.9.6" inside $MavenDistDir
    Remove-Item $MavenZip
    Write-Host "Maven installed."
}
else {
    Write-Host "Maven already installed."
}

# Setup JDK
$JdkZip = "$DistDir\jdk.zip"
$JdkDistDir = "$DistDir\jdk"

if (-not (Test-Path $JdkDistDir)) {
    Write-Host "Downloading JDK 17..."
    Invoke-WebRequest -Uri $JdkUrl -OutFile $JdkZip
    
    Write-Host "Extracting JDK..."
    Expand-Archive -Path $JdkZip -DestinationPath $JdkDistDir -Force
    
    Remove-Item $JdkZip
    Write-Host "JDK 17 installed."
}
else {
    Write-Host "JDK 17 already installed."
}

Write-Host "Setup complete. Use mvnw.cmd to run commands."
