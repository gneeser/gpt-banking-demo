# Dockerfile

# Use node alpine as it's a small node image
FROM node:alpine
RUN apk add --no-cache bash

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# RUN apk update && apk add bash

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json /app

# Install dependencies in /app
RUN npm install
# RUN yarn install

# Copy the rest of our Next.js folder into /app
COPY . /app

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line 
# CMD ["yarn", "dev"]
# CMD ["yarn", "watch"]
CMD ["npm", "run", "dev"]
