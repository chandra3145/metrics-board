# build both frontend and backend
FROM node:20 AS builder

WORKDIR /app

# backend build
COPY backend ./backend
WORKDIR /app/backend
RUN npm install
RUN npm run build

# frontend build
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# final stage
FROM node:20-slim
WORKDIR /app

# backend output
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/package.json

# frontend build output
COPY --from=builder /app/frontend/build ./frontend/build

# only production deps
RUN cd backend && npm install --omit=dev

EXPOSE 4000

CMD ["node", "backend/dist/server.js"]