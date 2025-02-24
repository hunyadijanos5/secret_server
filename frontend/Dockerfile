# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 8080
CMD ["npm", "run", "serve"]
