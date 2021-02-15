FROM node:latest

ENV CI=true

COPY . /task-manager/react-app
WORKDIR /task-manager/react-app

RUN npm install

CMD ["npm","start"]