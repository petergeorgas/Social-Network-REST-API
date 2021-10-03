FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies, ensuring BOTH package.json and package-lock are copied.
COPY package*.json ./
# Install dependencies with NPM. 
RUN npm install 

COPY . . 

# Map port 8080 to the docker daemon 
EXPOSE 3000 

# Start the server...  
CMD ["node", "app.js"]