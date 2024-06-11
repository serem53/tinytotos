# Use the official Node.js 14 image as a base
FROM node:20.11.1-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 9000

#Build the app
RUN npm run build

# Command to run the application
CMD ["npm", "run", "start"]
