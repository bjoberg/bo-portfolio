# #############################################################################
# Builder
# #############################################################################
FROM node:12 AS builder

# Setup the working directory
WORKDIR /usr/src/app
COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

# Build the application
ENV NODE_ENV production
RUN npm run build

# #############################################################################
# Runner
# #############################################################################
FROM node:alpine

# Create a new user... don't run as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Setup the working directory
WORKDIR /usr/src/app
COPY package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/next.config.js ./next.config.js

# Set app configuration
ENV NODE_ENV production

# Start the application
CMD [ "npm", "run", "start:production" ]