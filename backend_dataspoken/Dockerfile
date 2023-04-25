FROM node:16 as develop
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY .babelrc ./
RUN npm run build

FROM node:16.3.0-alpine

COPY --from=develop /usr/src/app /
EXPOSE 80
EXPOSE 8080

CMD ["npm", "start"]