FROM node:14-alpine
MAINTAINER Wanglei<nihiue@gmail.com>

#RUN npm config set disturl https://npm.taobao.org/dist --global
#RUN npm config set registry https://registry.npm.taobao.org --global

WORKDIR /app
COPY . .
RUN npm install
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

EXPOSE 3100
ENTRYPOINT node src/index.js