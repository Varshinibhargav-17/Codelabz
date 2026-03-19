# ================================
# Stage 1: Build
# ================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Declare build args for Vite environment variables
ARG VITE_APP_FIREBASE_API_KEY
ARG VITE_APP_AUTH_DOMAIN
ARG VITE_APP_FIREBASE_PROJECT_ID
ARG VITE_APP_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_APP_FIREBASE_APP_ID
ARG VITE_APP_FIREBASE_MEASUREMENTID
ARG VITE_APP_DATABASE_URL
ARG VITE_APP_FIREBASE_STORAGE_BUCKET
ARG VITE_APP_FIREBASE_FCM_VAPID_KEY
ARG VITE_APP_USE_EMULATOR

# Set as env vars so Vite can read them at build time
ENV VITE_APP_FIREBASE_API_KEY=$VITE_APP_FIREBASE_API_KEY
ENV VITE_APP_AUTH_DOMAIN=$VITE_APP_AUTH_DOMAIN
ENV VITE_APP_FIREBASE_PROJECT_ID=$VITE_APP_FIREBASE_PROJECT_ID
ENV VITE_APP_FIREBASE_MESSAGING_SENDER_ID=$VITE_APP_FIREBASE_MESSAGING_SENDER_ID
ENV VITE_APP_FIREBASE_APP_ID=$VITE_APP_FIREBASE_APP_ID
ENV VITE_APP_FIREBASE_MEASUREMENTID=$VITE_APP_FIREBASE_MEASUREMENTID
ENV VITE_APP_DATABASE_URL=$VITE_APP_DATABASE_URL
ENV VITE_APP_FIREBASE_STORAGE_BUCKET=$VITE_APP_FIREBASE_STORAGE_BUCKET
ENV VITE_APP_FIREBASE_FCM_VAPID_KEY=$VITE_APP_FIREBASE_FCM_VAPID_KEY
ENV VITE_APP_USE_EMULATOR=$VITE_APP_USE_EMULATOR

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy and install functions dependencies
COPY ./functions/package*.json ./functions/
RUN cd functions && npm install && cd ..

# Copy the rest of the source code
COPY . .

# Build the app for production
RUN npm run build

# ================================
# Stage 2: Production
# ================================
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
