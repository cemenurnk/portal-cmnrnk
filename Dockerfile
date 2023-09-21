FROM mhart/alpine-node:12 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]