# Stage 1: Build
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Production
FROM node:20-alpine AS production-stage

WORKDIR /app

COPY --from=build-stage /app/.output ./

EXPOSE 3000

CMD ["node", "./app/server/index.mjs "]