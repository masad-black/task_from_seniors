FROM node:20-alpine 

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "server" ]