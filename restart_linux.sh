docker compose down

echo "************ Backend *************"
cd ./backend-api
rm -r ./dist
yarn build

echo "************ Frontend ************"
cd .. && cd ./frontend
rm -r ./dist
yarn build:dev

cd .. && cd ./artConfigurator
echo "************ Art Config ************"
rm -r ./dist
yarn build:dev

cd ..
echo "************ RUN DOCKER COMPOSE *************"
docker compose up -d --build
