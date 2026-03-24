FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx ng build --configuration production

FROM node:20-alpine

RUN npm install -g http-server

# Copy the browser directory
COPY --from=builder /app/dist/frontend/browser /app/dist

WORKDIR /app/dist

EXPOSE 4200

# Use -P flag to push state for SPA routing
CMD ["http-server", "-p", "4200", "-c-1", "-P", "http://localhost:4200?"]