# Server Setup Guide

This guide will help you set up and run the server application either manually using Node.js or via Docker.

---

## 🧾 Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for Docker-based setup)

---

##  Manual Setup

Follow these steps to get the server up and running manually:

### 1. Clone the repository

```bash
git clone <repo-url>
cd server

#Install Dependencies

npm install

#Create .env file in the root of project and add the following environment variables

PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

#Start the server

npm start or node app.js

#The entry point of the app is app.js. After starting, the server should be running on http://localhost:5000


# Docker setup 

# Make sure you are in the root directory while running these commands because the Dockerfile is in the root.

#build the docker image

docker build -t my-node-app .

# Make sure .env file exists in the root and contains PORT, MONGODB_URL, and JWT_SECRET.

#Run the docker container 

docker run -p 5000:5000 --env-file .env my-node-app

# Now the app should be accessible at http://localhost:5000.







