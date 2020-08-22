@echo off

cd "../"

rem declaring our global variables
set REQUIRED_DIRECTORY=db
set VALIDATE_LOGGING_LEVELS=info error fatal
set TEST_DATABASE_PATH=./db/test.db

call :log [info] checking to see if the required directory: "%REQUIRED_DIRECTORY%" exists.
call :file_exists %REQUIRED_DIRECTORY%

if %file_exists%==false (
    call :create_directory %REQUIRED_DIRECTORY%
    call :create_file %TEST_DATABASE_PATH%
) else (
    call :log [info] the required directory: "%REQUIRED_DIRECTORY%" already exists...
)

pause

:file_exists
    setlocal
    set _exists=false
    if exist %~1 (
        set _exists=true
    )
    endlocal & set file_exists=%_exists%
exit /b 0

:create_directory
    call :log [info] attempting to create the directory: %1
    mkdir %~1
    call :log [info] successfully created directory: %1
exit /b 0

:create_file
    call :log [info] attempting to create file at %1
    echo > %1
    rem TODO: add proper error checking, check if there's hard drive space before attempting to create folder and files.
    rem TODO: check read write permissions etc.s
    call :log [info] successfully create file "%1"
exit /b 0

:get_date_and_time
    For /f "tokens=1-3 delims=/ " %%a in ('date /t') do (set current_date=%%c-%%b-%%a)
    set current_time=%time%
exit /b 0

:log
    setlocal
    rem TODO: validate logging levels.
    call :get_date_and_time
    echo %current_date%T%current_time%Z %*
    endlocal
exit /b 0