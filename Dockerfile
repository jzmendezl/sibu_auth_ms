FROM node:lts as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./

COPY src ./src

RUN npm run build

FROM node:lts-alpine as production-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --from=build-stage /app/dist ./dist

CMD [ "npm", "run", "start" ]

