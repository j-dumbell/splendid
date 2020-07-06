FROM node:12-alpine

WORKDIR /code

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY public public/
COPY src src/

EXPOSE 3000
CMD yarn start