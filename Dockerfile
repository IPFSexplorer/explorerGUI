FROM node:12-alpine

ENV port 8080

WORKDIR /usr/src/app


COPY *.json ./

RUN npm install -g typescript
RUN npm install -g http-server
RUN npm install -g @vue/cli
RUN apk add \
    python \
    make \
    g++ \
    git
RUN npm install
COPY . .
RUN npm run build

WORKDIR /usr/src/app/dist
CMD [ "http-server", "/usr/src/app/dist"]