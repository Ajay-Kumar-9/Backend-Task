
# 📦 Server Setup Guide

This guide will help you set up and run the server application either manually using Node.js or via Docker.

---

## 🧾 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above recommended)  
- [npm](https://www.npmjs.com/)  
- [Docker](https://www.docker.com/) (optional, for Docker-based setup)  

---

## ⚙️ Manual Setup

Follow these steps to get the server up and running manually:

### 1. Clone the Repository

```bash
git clone <repo-url>
cd server
2. Install Dependencies
bash
Copy code
npm install
3. Create .env File
In the root of the project, create a .env file and add the following environment variables:

ini
Copy code
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ℹ️ Replace the values with your actual configuration.

4. Start the Server
bash
Copy code
npm start
# or
node app.js
The server will start and run at:
 http://localhost:5000

 Docker Setup
Make sure you are in the root directory where the Dockerfile is located.

1. Build the Docker Image
bash
Copy code
docker build -t my-node-app .
2. Run the Docker Container
Ensure the .env file exists in the root directory and contains the required environment variables (PORT, MONGODB_URL, JWT_SECRET).

bash
Copy code
docker run -p 5000:5000 --env-file .env my-node-app
Your app will be accessible at:
 http://localhost:5000