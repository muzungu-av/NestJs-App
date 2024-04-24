echo "************* BACK CONF *************"
docker compose stop paint-back-api

cd ./backend-api
rm -r ./dist
yarn build
cd ..

docker compose up -d --build paint-back-api