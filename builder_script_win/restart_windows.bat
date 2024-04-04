call docker-compose down
echo ************ Backend *************
CALL .\backend.bat

echo ************ Frontend ************
cd ..
cd .\builder_script_win
CALL .\frontend.bat

echo ************ Art Config ************
cd .. 
cd .\builder_script_win
CALL art.bat

cd ..
echo ************ RUN DOCKER COMPOSE *************
call docker-compose up -d --build
docker ps
