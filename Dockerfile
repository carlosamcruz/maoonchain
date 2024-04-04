FROM node as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY bsv /app/node_modules

COPY . .

RUN npx scrypt-cli@latest compile

RUN npm run build

FROM nginx:stable-alpine

COPY config-docker/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]