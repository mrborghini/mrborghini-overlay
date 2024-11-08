FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]