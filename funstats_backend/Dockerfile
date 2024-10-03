# Dockerfile
# Use Node.js image as base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the host machine
EXPOSE 5050

# Start the Express server
CMD ["/bin/bash", "-c", "npm start;npm run migrate:down;npm run migrate;npm run seed"]