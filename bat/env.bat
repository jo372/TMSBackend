@echo off

call :%1

:get_application_name
    if "%APPLICATION_NAME%"=="" (
        set APPLICATION_NAME="TMS"
    )
goto :exit

:get_start_script_name
    if "%START_SCRIPT_NAME%"=="" (
        set START_SCRIPT_NAME="./dist/app.js"
    )
goto :exit

:exit
exit /b