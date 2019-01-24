FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json  /usr/src/app/package.json

RUN npm install

ADD docker_entrypoint /usr/bin/docker_entrypoint

ENTRYPOINT ["/usr/bin/docker_entrypoint"]

ADD . /usr/src/app

CMD ["npm", "start"]
