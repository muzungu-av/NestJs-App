FROM node:18.19-alpine AS paint-back-api-img

# Установка сборочных зависимостей GraphicsMagick для jpg, jpeg, png
RUN apk add --no-cache build-base \
    && apk add --no-cache \
    libjpeg-turbo-dev \
    libpng-dev

# Установка GraphicsMagick
RUN apk add --no-cache graphicsmagick

RUN mkdir -p /app
WORKDIR /app/

COPY ./backend-api/dist/ ./dist
COPY ./backend-api/node_modules/ ./node_modules

ENV NODE_ENV=development
EXPOSE 3000
CMD NODE_ENV=development node dist/main

