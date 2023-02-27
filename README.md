![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![Typeorm](https://img.shields.io/badge/{_Typeorm_}-%21E0234E.svg?style=for-the-badge&logo=typeorm&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![WebStorm](https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black)


## Description

A tiny server app based on Node.js. (Nest.js).
The app implement simple organization user structure management operations.
The following user roles supported:
a. Administrator (top-most user)
b. Boss (any user with at least 1 subordinate)
c. Regular user (user without subordinates)
Each user except the Administrator must have a boss (strictly one).
The following REST API endpoints exposed:
1. Register user.
2. Authenticate as a user.
3. Return list of users, taking into account the following:
- administrator can see everyone;
- boss can see herself and all subordinates (recursively);
- regular user can see only himself.
4. Change user's boss (only boss can do that and only for his subordinates).

## Installation

```bash
$ npm install
or
$ yarn install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the server

```bash
# create migrations
$ npm run migration:create src/db/migrations/migration_name

# generate migrations
$ npm run migration:generate -- src/db/migrations/migration_name

# run migrations
$ npm run migration:run
```

## Swagger documentation http://localhost:5001/api/docs