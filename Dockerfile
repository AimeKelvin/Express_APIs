# Use official Node.js LTS image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app code
COPY . .

# Expose port (adjust if your app uses another port)
EXPOSE 3000

# Start your app
CMD ["node", "server.js"]
