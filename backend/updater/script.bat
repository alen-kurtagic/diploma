@echo off
setlocal enabledelayedexpansion

REM Set a counter for the number of retries
set retries=0

:begin
"C:\University\Year 1\Term 1\Programiranje 1\venv\Scripts\python.exe" "C:\University\Year 3\Term 2\Diplomsko delo\eParcela\backend\updater\updater.py"

REM Check if the exit code is not 0 and retries are less than 3
if %ERRORLEVEL% NEQ 0 (
    set /a retries+=1
    if !retries! lss 4 (
        REM Wait for 1 minute
        timeout /t 60

        REM Go back to the beginning and rerun the script
        goto begin
    ) else (
        REM Exit with the error code if retries have been exhausted
        EXIT /B %ERRORLEVEL%
    )
) else (
    REM Exit with success code
    EXIT /B 0
)
