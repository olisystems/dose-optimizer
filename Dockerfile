FROM node:11-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

USER root

RUN npm install pm2 -g

COPY --chown=node:node . .

CMD [ "pm2-runtime", "dist/server.js" ]