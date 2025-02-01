# Étape 1 : Utiliser une image de base Node.js
FROM node:18-alpine AS base

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de configuration
COPY package.json package-lock.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du code
COPY . .

# Étape 6 : Étape de développement
FROM base AS dev
CMD ["npm", "run", "dev"]

# Étape 7 : Étape de production
FROM base AS prod
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]