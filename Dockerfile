FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install db-migrate-pg
RUN npm rebuild bcrypt

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]

