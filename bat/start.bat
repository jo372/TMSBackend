@echo off

if "%ENV_BAT_PATH%"=="" (
    set ENV_BAT_PATH="./env.bat"
)

call %ENV_BAT_PATH% get_application_name
call %ENV_BAT_PATH% get_start_script_name

cd ../
pm2 start %START_SCRIPT_NAME% --name %APPLICATION_NAME% -- start & cd "./bat/"
