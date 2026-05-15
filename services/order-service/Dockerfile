FROM node:20

RUN apt-get update && apt-get install -y curl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["node", "src/app.js"]