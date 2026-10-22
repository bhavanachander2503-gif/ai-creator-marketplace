# CREOVA TRUSTGUARD — Unified Combined Server Launcher (PowerShell)
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   CREOVA TRUSTGUARD — Unified Combined Server Launcher   " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$root = $PSScriptRoot
$backendDir = Join-Path $root "backend"
$pythonExec = Join-Path $backendDir ".venv\Scripts\python.exe"

if (-not (Test-Path $pythonExec)) {
    $pythonExec = "python"
}

Write-Host "`nStarting Node.js Proxy & Frontend Server with automatic backend orchestration..." -ForegroundColor Green
& node (Join-Path $root "server.js")
