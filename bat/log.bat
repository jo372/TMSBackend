@echo off

call :log %*

:get_date_and_time
    For /f "tokens=1-3 delims=/ " %%a in ('date /t') do (set current_date=%%c-%%b-%%a)
    set current_time=%time%
goto :exit

:log
    setlocal
    rem TODO: validate logging levels.
    call :get_date_and_time
    echo %current_date%T%current_time%Z %*
    endlocal
goto :exit

:exit
exit /b

