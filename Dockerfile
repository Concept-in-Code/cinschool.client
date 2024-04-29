FROM node:18
WORKDIR /app
ARG PROJECT
COPY package*.json ./
RUN npm install
COPY . .

ENV PROJECT $PROJECT

RUN npm run build --project common

EXPOSE 4200
CMD npm run start ${PROJECT} -- --host 0.0.0.0