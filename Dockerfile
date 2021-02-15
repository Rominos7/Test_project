FROM node:latest

COPY . /task-manager/react-app
WORKDIR /task-manager/react-app

RUN npm install

ENTRYPOINT ["npm","start"]