FROM node:19.0.0-alpine as base
ARG SERVICE_NAME
WORKDIR /usr/src/${SERVICE_NAME}
COPY package*.json yarn*.lock tsconfig*.json ./


FROM base as test
ENV NODE_ENV=development
RUN yarn install
COPY . .
RUN yarn test


FROM base as dev
ENV NODE_ENV=development
CMD yarn install && yarn start:dev


FROM base as prod
ENV NODE_ENV=production

RUN yarn install --production
RUN yarn build
RUN yarn cache clean

CMD yarn start:prod
