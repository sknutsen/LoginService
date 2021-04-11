FROM node:14
WORKDIR /usr/src/loginservice
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run start"]