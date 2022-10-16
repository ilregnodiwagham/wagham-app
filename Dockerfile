FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
RUN ionic build --prod
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=build /app/www/ /wagham-app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
