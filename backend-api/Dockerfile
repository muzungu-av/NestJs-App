FROM node:18.19-alpine AS paint-back-api-img

# Установка сборочных зависимостей GraphicsMagick для jpg, jpeg, png
# python3, make  g++   - это для пересборки Bcrypt, они потом будут удалены из образа
RUN apk add --no-cache build-base \
    && apk add --no-cache \
    libjpeg-turbo-dev \
    libpng-dev \
    python3 \
    make \
    g++

# Установка GraphicsMagick
RUN apk add --no-cache graphicsmagick

RUN mkdir -p /app
WORKDIR /app/

COPY ./backend-api/dist/ ./dist
COPY ./backend-api/node_modules/ ./node_modules
COPY ./backend-api/src/auth/init-user.mjs /app/dist/auth/init-user.mjs

# Перекомпилируем bcrypt для обеспечения совместимости с Alpine
RUN npm rebuild bcrypt --build-from-source \
    && apk del python3 make g++

RUN yarn global add ts-node

RUN mkdir -p /app/shared_volume \
    && ts-node /app/dist/auth/init-user.mjs > /app/shared_volume/hashed_pass.txt

RUN yarn global remove ts-node

EXPOSE 4001
CMD node dist/main