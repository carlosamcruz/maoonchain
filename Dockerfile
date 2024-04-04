FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY bsv /app/node_modules

COPY . .

RUN npx scrypt-cli@latest compile

EXPOSE 3000

CMD ["npm", "start"]