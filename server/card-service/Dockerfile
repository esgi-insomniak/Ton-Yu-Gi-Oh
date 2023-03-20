FROM node:19.0.0-alpine
RUN apk add yarn
RUN mkdir -p /var/www/card-service
WORKDIR /var/www/card-service
ADD . /var/www/card-service
RUN yarn install
CMD yarn build && yarn cache clean && yarn start:prod
