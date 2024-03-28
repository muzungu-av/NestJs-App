# PRODUCTION  FRONTEND
FROM nginx:stable AS paint-front-img

# Установка mc
RUN apt-get update && \
    apt-get install -y mc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN rm -rf /usr/share/nginx/html/*
COPY ./frontend/dist /usr/share/nginx/html
COPY ./frontend/front-nginx/front-nginx.conf /etc/nginx/nginx.conf

EXPOSE 8081

ENTRYPOINT ["nginx", "-g", "daemon off;"]
