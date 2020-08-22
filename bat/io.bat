@echo off

if "%LOG_BAT%"==""  (
    set LOG_BAT="./log.bat"
)

call :%1 %*

:file_exists
    setlocal
    set _exists=false
    if exist %2 (
        set _exists=true
    )
    endlocal & set f_exists=%_exists%
goto :exit

:create_directory
    call %LOG_BAT% [info] attempting to create the directory: %2
    mkdir %2
    call %LOG_BAT% [info] successfully created directory: %2
goto :exit

:create_file
    call %LOG_BAT% [info] attempting to create file at %2
    echo > %2
    rem TODO: add proper error checking, check if there's hard drive space before attempting to create folder and files.
    rem TODO: check read write permissions etc.s
    call %LOG_BAT% [info] successfully create file %2
goto :exit

:exit
exit /b