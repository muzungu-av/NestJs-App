docker compose down
echo "************* BACK **************"
cd ./backend-api
rm -r ./dist
yarn build
cd ..

echo "*********** ART CONF ************"
cd ./artConfigurator
rm -r ./dist
yarn build:dev
cd ..

echo "*********** FRONTEND ************"
cd ./frontend
rm -r ./dist
yarn build:dev
cd ..

echo "************ DOCKER *************"
docker compose up -d --build