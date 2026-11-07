@echo off
title Hom Nay Em Muon An Gi - Vong Quay Hen Ho
chcp 65001 > nul
echo ===================================================
echo   DANG KHOI DONG: HOM NAY EM MUON AN GI? 💕
echo ===================================================
python server.py
if errorlevel 1 (
    echo Python khong co san, dang mo truc tiep index.html tren trinh duyet...
    start index.html
)
pause
