FROM node:19.0.0-alpine as dev
ARG SERVICE_NAME

ENV NODE_ENV=development

WORKDIR /usr/src/${SERVICE_NAME}

COPY package*.json yarn*.lock tsconfig*.json ./

CMD yarn install && yarn start:dev

FROM node:19.0.0-alpine as prod
ARG SERVICE_NAME

ENV NODE_ENV=production

WORKDIR /usr/src/${SERVICE_NAME}

COPY package*.json yarn*.lock tsconfig*.json ./

RUN yarn install --production
RUN yarn build
RUN yarn cache clean

CMD yarn start:prod
