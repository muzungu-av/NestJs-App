FROM ubuntu:20.04 AS base-ubuntu
# Устанавливаем gnupg
RUN apt-get update && apt-get install -y curl gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Добавляем ключ MongoDB
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

RUN apt update && apt install mongodb-org -y

FROM base-ubuntu AS d-mongo

COPY ./mongo/mongod.conf /etc/mongod.conf
COPY ./mongo/init-script.js /docker-entrypoint-initdb.d/init-script.js

# вытаскиваем хешированный пароль (bcrypt) подготовленный в образе paint-back-api-img
# подменяем его в скрипте инициализации монго init-script.js, вместо "change_me"
COPY --from=paint-back-api-img /app/shared_volume/hashed_pass.txt /tmp/shared_volume/hashed_pass.txt
RUN HASHED_PASS=$(cat /tmp/shared_volume/hashed_pass.txt) \
    && sed -i "s~password: \"change_me\"~password: \"${HASHED_PASS}\"~" /docker-entrypoint-initdb.d/init-script.js

RUN openssl rand -base64 756 > /var/lib/mongodb/mongodb-keyfile \
    && chmod 600 /var/lib/mongodb/mongodb-keyfile

# Запускаем MongoDB для создания пользователя в базе данных
RUN mongod --fork --logpath /var/log/mongodb/mongod.log --config /etc/mongod.conf --noauth && \
    sleep 5 && \
    mongo admin /docker-entrypoint-initdb.d/init-script.js

# Start MongoDB with authentication enabled
CMD ["mongod", "--fork", "--logpath", "/var/log/mongodb/mongod.log", "--config", "/etc/mongod.conf"]