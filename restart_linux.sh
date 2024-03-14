docker compose stop

cd ./backend-api
echo "************ Backend *************"
yarn build

cd .. && cd ./frontend
echo "************ Frontend ************"
yarn build

#cd .. && cd ./artConfigurator
#echo "************ Art Config ************"
#yarn build

cd ..
echo "************ RUN DOCKER COMPOSE *************"
docker compose up -d --build
