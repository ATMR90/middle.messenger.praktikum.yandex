FROM ubuntu:18.04
RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/www
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt -y -f install nodejs make gcc g++
COPY package.json ./
RUN npm install npm -g
RUN npm install
RUN node -v
COPY . .
EXPOSE 3000
CMD npm run start