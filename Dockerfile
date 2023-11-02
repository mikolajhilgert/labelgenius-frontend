# Use the latest Node Alpine image as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /musefy

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Open the port on which the server will start
EXPOSE 3000

# Run the front-end server
CMD ["npm", "start"]