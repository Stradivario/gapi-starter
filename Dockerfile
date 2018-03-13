# Builds a Docker to deliver dist/
FROM node:8.9.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g Stradivario/gapi-cli pm2-docker ts-node typescript pm2

COPY package-lock.json package-lock.json

COPY package.json package.json

RUN npm install

ENV NODE_ENV=production 

COPY . .

CMD [ "gapi", "start", "--prod", "--docker" ]