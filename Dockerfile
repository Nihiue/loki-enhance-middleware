FROM node:16-alpine as builder
MAINTAINER Wanglei<nihiue@gmail.com>

WORKDIR /buidler
COPY . .
RUN npm install && npm run build && npm run compile-proto
RUN npm prune --production

FROM node:16-alpine
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /app

COPY --from=builder /buidler/dist ./
COPY --from=builder /buidler/mmdb ./
COPY --from=builder /buidler/node_modules ./
COPY --from=builder /buidler/package.json ./

ENTRYPOINT npm run serve
