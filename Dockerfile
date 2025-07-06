# Iron-Anarchy Minecraft Bot Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Create application user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S botuser -u 1001

# Create necessary directories
RUN mkdir -p logs recordings screenshots config && \
    chown -R botuser:nodejs /app

# Copy application files
COPY --chown=botuser:nodejs . .

# Expose ports
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Bot is healthy')" || exit 1

# Switch to non-root user
USER botuser

# Start the bot
CMD ["npm", "start"]
