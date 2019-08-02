FROM node:10
WORKDIR /backend/src
COPY package.json /backend
RUN npm install
COPY . /backend
CMD [ "npm", "start" ]