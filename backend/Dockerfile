# Dockerfile para backend
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9008
CMD ["node", "server.js"]
