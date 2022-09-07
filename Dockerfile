FROM node:14-alpine as builder
MAINTAINER Wanglei<nihiue@gmail.com>

WORKDIR /buidler
COPY . .
RUN npm install && npm run build && npm run compile-proto
RUN npm prune --production

FROM node:14-alpine
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /app

COPY --from=builder /buidler/dist ./dist
COPY --from=builder /buidler/mmdb ./mmdb
COPY --from=builder /buidler/node_modules ./node_modules
COPY --from=builder /buidler/package.json ./package.json

ENTRYPOINT npm run serve
