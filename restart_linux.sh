docker compose stop

cd ./backend-api
yarn build

cd .. && cd ./frontend
yarn build

cd ..
docker compose up -d --build
