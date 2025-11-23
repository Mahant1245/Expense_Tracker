🏦 Expense Tracker — Full Stack MERN Application

A modern full-stack Expense Tracker built using React (Vite), Node.js, Express, and MongoDB.
The application provides live visualisations, weather-themed UI modes, transaction management, and a clean user interface optimised for simplicity and clarity.

As part of the Adobe Business Challenge 2025, this project also extends ideas from my team’s prototype "CashCow", integrating improved user experience flows and visual data representation techniques inspired by the challenge.

✨ Features
🎨 Weather-Themed Dynamic UI

Sunny, Cloudy, and Storm modes

Smooth colour transitions

Automatic text visibility fixes (Storm Mode ensures readable inputs + labels)

💰 Smart Expense Management

Add income or expenses

View all transactions in a chronological history list

Real-time balance and spending updates

📊 Visual Analytics

Interactive pie-chart (via Recharts)

Highlights spending patterns and category distribution

🔌 REST API (Express + MongoDB)

CRUD endpoints for categories, transactions, and labels

Mongoose schemas for clean data handling

Secure environment variables using dotenv

🧪 Adobe Business Challenge Integration — CashCow Prototype

During the Adobe Business Challenge 2025, I worked on a financial wellness prototype called CashCow, focusing on:

simplifying money management,

clearer data visualisation,

frictionless user interaction,

and a “fast-input” transaction system.

This Expense Tracker project integrates multiple UX ideas inspired by CashCow, such as:

minimalistic forms with high readability,

smooth real-time charts,

and a focus on lowering user friction during data entry.

🧱 Tech Stack
Frontend

React (Vite)

TailwindCSS

Recharts

Axios

Backend

Node.js

Express

MongoDB Atlas

Mongoose

dotenv

CORS

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

📂 Folder Structure
project-root/
│
├── client/                 # React frontend
│   ├── src/
│   └── package.json
│
└── server/                 # Backend API (Express)
    ├── controllers/
    ├── db/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json



▶️ Running Locally
Clone the repository

Setup Backend
cd server
npm install
npm start

Setup Frontend
cd client
npm install
npm run dev

