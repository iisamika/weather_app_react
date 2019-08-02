FROM node:10
WORKDIR /frontend/src
COPY package.json /frontend
RUN npm install
COPY . /frontend
CMD [ "npm", "start" ]