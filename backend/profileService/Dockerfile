FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# Pass default environment variable for port
ENV PORT=5001

# Internal MongoDB URL
ENV MONGO_URL=mongodb://host.docker.internal:27017/streaming-db

EXPOSE 5001
CMD ["node", "index.js"]