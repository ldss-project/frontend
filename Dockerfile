FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-only
EXPOSE 8080
CMD npm run dev:docker