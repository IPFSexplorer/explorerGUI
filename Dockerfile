FROM node:12-alpine

WORKDIR /usr/src/app


COPY *.json ./

RUN npm install -g typescript
RUN npm install --global http-server
RUN apk add \
    python \
    make \
    g++ \
    git
RUN npm install
COPY . .
RUN npm run build

ENV envPort=$port
WORKDIR /usr/src/app/dist
CMD [ "http-server", "/usr/src/app/dist", "-p ${envPort}"]