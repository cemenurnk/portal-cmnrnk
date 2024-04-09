FROM node:18-alpine

ENV VITE_USERNAME=sievert
ENV VITE_PASSWORD=PwXWeJfNWKaJ
ENV VITE_APIREST=https://apirest.cemenurnk.org.ar/
ENV VITE_DOMINIO_PORTAL=https://miportal.cemenurnk.org.ar/
ENV VITE_ENVIRONMENT=PROD

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]