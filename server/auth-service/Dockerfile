FROM node:19.0.0-alpine as dev
WORKDIR /usr/src/app

RUN apk add yarn

ENV NODE_ENV=development

CMD yarn install && \
    yarn typeorm:migrate && \
    yarn start:dev

FROM node:19.0.0-alpine as prod
WORKDIR /usr/src/app

RUN apk add yarn

COPY package*.json yarn*.lock tsconfig*.json ./
RUN yarn install

COPY . .

RUN yarn build
RUN yarn cache clean

ENV NODE_ENV=production

CMD yarn typeorm:migrate && \
    node dist/main.js