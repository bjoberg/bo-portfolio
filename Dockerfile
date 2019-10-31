# Builder
FROM node:12 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV production
RUN npm run build

# Runner
FROM node:12
# RUN addgroup -S appuser && adduser -u -S appuser -G appuser
# USER appuser
COPY --from=builder /usr/src/app/build /app
WORKDIR /app
RUN ls ./static/js
ENV PORT 8080
ENV NODE_ENV production
EXPOSE 8080
CMD [ "node", "server.js" ]