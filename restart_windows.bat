
echo ************ Backend *************
cd .\backend-api
rmdir /s /q .\dist
yarn build

echo ************ Frontend ************
cd .. && cd .\frontend
rmdir /s /q .\dist
yarn build:dev

cd .. && cd .\artConfigurator
echo ************ Art Config ************
rmdir /s /q .\dist
yarn build:dev

cd ..
echo ************ RUN DOCKER COMPOSE *************
docker-compose up -d --build
