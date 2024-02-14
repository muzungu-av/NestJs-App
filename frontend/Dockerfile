# PRODUCTION  FRONTEND
FROM nginx:stable AS paint-front-img

RUN rm -rf /usr/share/nginx/html/*
COPY ./frontend/dist /usr/share/nginx/html
COPY ./frontend/front-nginx/front-nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
