
# The Innovengers – EleganceWear Privacy Dashboard

This repository contains the full-stack web application for **EleganceWear**, an e-commerce platform enhanced with a **Data Privacy & Transparency Dashboard**. This dashboard empowers users to control how their personal data is used while shopping online.

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ananyahegde/The-Innovengers.git
cd The-Innovengers
```

### 2. Backend Setup

```bash
cd backend

# Initialize project and install dependencies
npm init -y
npm install express jsonwebtoken dotenv cors mongoose bcrypt
npm install --save-dev nodemon
```

### 3. MongoDB Configuration

- Install [MongoDB Compass](https://www.mongodb.com/docs/manual/administration/install-community/).
- run `cd backend` in terminal
- run `node server.js` or  `npm start devStart`.  
- Import the file `frontend/assets/products.json` into the **products** collection using MongoDB Compass.

### 4. Environment Variables

Create a `.env` file in the `backend/` directory with the following content:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 5. Run Backend Server

```bash
# Start the backend
npm run devStart
```

For the auth server:

```bash
npm run devStartAuth
```

### 6. Run Frontend

Go to `localhost:3000` in your browser.


## ✨ Features

- Responsive frontend built using Tailwind CSS
- REST API with Express.js and MongoDB
- User authentication (Login / Signup)
- View and control:
  - Consent Settings (email, location, device info)
  - Purpose Limitation (ads, personalization)
  - Access Logs (who accessed data and when)
- Real-time Data Usage chart (via Chart.js)

## The project is deployed using mongodb atlas and render


