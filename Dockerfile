FROM node:18
WORKDIR /app
ARG PROJECT
COPY package*.json ./
RUN npm install
COPY . .

ENV PROJECT $PROJECT

RUN npm run build --project ${PROJECT} --

EXPOSE 4200
CMD npm install && npm run start ${PROJECT} -- --serve-path=/${PROJECT}/ --host 0.0.0.0 --watch --disable-host-check
