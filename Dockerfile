# Base image
# FROM node:14-alpine
FROM node:14-alpine AS build-deps

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm install -g serve

RUN npm run build

# Expose the desired port (e.g., 3000 for React development server)
# EXPOSE 3000

# Run the application
# CMD ["serve", "-s", "build"]

# Stage 2 - the production environment
FROM nginx:1.19.0-alpine
#
COPY --from=build-deps /app/build /usr/share/nginx/html
#
# # new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#
EXPOSE 80
#
CMD ["nginx", "-g", "daemon off;"]