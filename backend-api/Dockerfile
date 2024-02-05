FROM node:18.19-alpine AS paint-back-api-img

RUN mkdir -p /app
WORKDIR /app/

COPY ./dist/ ./dist
COPY ./node_modules/ ./node_modules

ENV NODE_ENV=development
EXPOSE 3000
CMD NODE_ENV=development node dist/main

# docker build . -t paint-back-api-img

