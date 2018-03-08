# Builds a Docker to deliver dist/
FROM node:8.9.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app


COPY package.json package.json
RUN npm install
RUN npm install -g gapi-cli pm2-docker ts-node typescript pm2
COPY . .
RUN npm run tsc

CMD [ "npm", "run", "start:prod" ]
