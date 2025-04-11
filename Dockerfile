FROM node:slim

RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

EXPOSE 3000