# PRODUCTION  FRONTEND
FROM nginx:stable AS art-config-img

RUN rm -rf /usr/share/nginx/html/*
COPY ./artConfigurator/dist /usr/share/nginx/html
COPY ./artConfigurator/front-nginx/front-nginx.conf /etc/nginx/nginx.conf

EXPOSE 8085

ENTRYPOINT ["nginx", "-g", "daemon off;"]
