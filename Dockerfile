FROM "node:16.13-buster"

WORKDIR /app

COPY yarn.lock yarn.lock
COPY package.json package.json

RUN yarn install

CMD yarn dev