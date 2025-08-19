#use Node.js latest image

FROM node:latest

#Set work directory

WORKDIR /app

#copy package and package-lock.json

COPY package*.json ./

#install dependencies

RUN npm install

#Now copy all other files

COPY . .

#define port to expose

EXPOSE 5000

#start app

CMD ["npm" , "start"]