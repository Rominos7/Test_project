FROM node:latest

COPY . /task-manager/react-app
WORKDIR /task-manager/react-app
ENV CI=true
RUN npm install

ENTRYPOINT ["npm","start"]