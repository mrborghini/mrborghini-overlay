FROM node:alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:bookworm

COPY --from=build /app/dist /usr/share/nginx/html

ENV NGINX_PORT=${PORT}

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]