# Stage 1: Build
FROM node:22-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy package.json to install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application code and build the application
COPY . .

# Change ownership of the application files to the non-root user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user for security
USER nodejs

# NODE_ENV is set to production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
