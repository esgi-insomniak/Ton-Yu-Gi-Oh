FROM node:19.0.0-alpine as dev
WORKDIR /usr/src/app

RUN apk add yarn

EXPOSE 3000

CMD yarn install && \
    yarn start:dev

FROM node:19.0.0-alpine as prod
WORKDIR /usr/src/app

RUN apk add yarn

COPY package*.json yarn*.lock tsconfig*.json ./
RUN yarn install

COPY . .

RUN yarn build
RUN yarn cache clean

EXPOSE 3000

CMD ["node", "dist/main.js"]