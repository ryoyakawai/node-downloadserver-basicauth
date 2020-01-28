FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# set ENV(in Dockerfile) and ARG(in Container)
ARG WEB_PORT
ENV WEB_PORT $WEB_PORT
ARG USERID
ARG PASSWD

EXPOSE $WEB_PORT
CMD [ "npm", "run", "start"]
