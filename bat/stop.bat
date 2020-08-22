@echo off

if "%ENV_BAT_PATH%"=="" (
    set ENV_BAT_PATH="./env.bat"
)

call %ENV_BAT_PATH% get_application_name

pm2 stop %APPLICATION_NAME% & pm2 delete %APPLICATION_NAME%

pause