:: Остановка контейнеров с использованием Docker Compose
docker-compose stop

:: Переход в каталог backend-api и выполнение сборки
cd .\backend-api
yarn build

:: Возврат в основной каталог и переход в каталог frontend
cd ..\frontend
yarn build

:: Возврат в основной каталог
cd ..

:: Запуск контейнеров с использованием Docker Compose, с пересборкой (--build)
docker-compose up -d --build
