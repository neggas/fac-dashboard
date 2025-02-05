# Étape 1 : Utiliser une image de base Node.js
FROM node:latest-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile