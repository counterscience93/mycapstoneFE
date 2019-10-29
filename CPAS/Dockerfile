FROM node:8.10.0

MAINTAINER Bao Nguyen Quoc <baonqse62392@fpt.edu.vn>

COPY package.json /tmp/package.json

RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./test
RUN rm -rf ./src

CMD ["npm","start"]