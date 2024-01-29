FROM --platform=linux/amd64 node:16-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Copia el archivo .env
COPY .env ./


FROM --platform=linux/amd64 node:16-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:16-alpine AS runner
WORKDIR /app

# Copia el archivo .env
COPY .env ./

COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]