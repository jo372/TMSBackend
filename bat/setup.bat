@echo off

rem declaring our global variables
set REQUIRED_DIRECTORY="../db"
set VALIDATE_LOGGING_LEVELS=info error fatal
set TEST_DATABASE_PATH="../db/test.db"
set LOG_BAT="./log.bat"
set IO_BAT="./io.bat"

call %LOG_BAT% [info] checking to see if the required directory: %REQUIRED_DIRECTORY% exists.
call %IO_BAT% file_exists %REQUIRED_DIRECTORY%

if %f_exists%==false (
    call %IO_BAT% create_directory %REQUIRED_DIRECTORY%
    call %IO_BAT% create_file %TEST_DATABASE_PATH%
) else (
     call %LOG_BAT% [info] the required directory: %REQUIRED_DIRECTORY% already exists...
)

pause