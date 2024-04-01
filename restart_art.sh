cd ./artConfigurator
echo "************ Art Config ************"
rm -r ./dist
yarn build:dev
cd ..

docker stop art-config

docker rm art-config

docker rmi art-config-img

docker compose up -d --build