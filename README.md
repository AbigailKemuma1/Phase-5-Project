
# Phase-5-Project
=======
# ⚡ Smart Energy Tracker

Deployed link: https://energy-saver-tracker-6afa02e3cb40.herokuapp.com/

> *An AI-powered full-stack web application that helps users monitor, analyze, and optimize their energy consumption for a greener future.*

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Technology Stack](#-technology-stack)
3. [Project Architecture](#-project-architecture)
4. [Frontend Components](#-frontend-components)
5. [Backend API](#-backend-api)
6. [Database Schema](#-database-schema)
7. [Authentication & Security](#-authentication--security)
8. [Deployment Guide](#-deployment-guide)
9. [Testing Strategy](#-testing-strategy)
10. [Future Enhancements](#-future-enhancements)

---

## 1. 🌍 Project Overview

**Smart Energy Tracker** is a full-stack web application designed to help users **monitor, analyze, and reduce their electricity usage**. It combines real-time analytics, AI-powered recommendations, and environmental awareness tools to promote sustainable energy consumption.

### 🔑 Key Features
- 🔐 **User Authentication:** Secure JWT-based authentication with bcrypt password hashing  
- 🔌 **Appliance Management:** Full CRUD operations for appliances and their usage data  
- 📊 **Real-time Analytics:** Interactive dashboards with charts and summaries  
- 🤖 **AI Energy Advisor:** Smart chatbot providing personalized energy-saving tips  
- 💰 **Cost Analysis:** Tracks consumption and estimates energy expenses  
- 🌱 **Carbon Tracking:** Calculates carbon footprint and environmental impact  

---

## 2. ⚙️ Technology Stack

### 🎨 Frontend
| Tool | Description |
|------|--------------|
| **React 19.1.1** | UI library |
| **Vite 7.1.7** | Build tool |
| **Tailwind CSS 3.4.18** | Styling framework |
| **React Router DOM 7.9.4** | Routing |
| **Framer Motion 12.23.24** | Animations |
| **Axios 1.12.2** | HTTP client |
| **Lucide React 0.545.0** | Icon set |

### 🧠 Backend
| Tool | Description |
|------|--------------|
| **Flask** | Python web framework |
| **SQLAlchemy** | ORM for database interaction |
| **SQLite** | Relational database |
| **JWT Extended** | Authentication |
| **Flask-Bcrypt** | Password hashing |
| **Flask-CORS** | Cross-origin resource sharing |
| **Marshmallow** | Data serialization |

### 🛠 Development Tools
- **ESLint 9.36.0** – Code linting  
- **PostCSS & Autoprefixer** – CSS optimization  
- **npm** – Package management  
- **Git** – Version control  

---

## 3. 🧩 Project Architecture

Phase-5-Project/
├── client/ # React frontend
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # UI Components
│ │ ├── pages/ # Application Pages
│ │ ├── config/ # API Configurations
│ │ ├── assets/ # Images & Icons
│ │ ├── App.jsx # Root Component
│ │ ├── main.jsx # Entry Point
│ │ └── index.css # Global Styles
│ ├── package.json
│ ├── vite.config.js
│ └── tailwind.config.js
│
├── server/ # Flask backend
│ ├── app/
│ │ ├── init.py # Flask App Factory
│ │ ├── models.py # Database Models
│ │ ├── schemas.py # Marshmallow Schemas
│ │ └── routes/
│ │ ├── auth.py # Authentication Endpoints
│ │ ├── appliances.py # CRUD for Appliances
│ │ └── analytics.py # Analytics API
│ ├── instance/db.sqlite3
│ ├── config.py
│ ├── run.py
│ ├── chatbot.py # AI Chatbot Logic
│ └── requirements.txt
│
└── DOCUMENTATION.md # Technical Documentation

markdown
Copy code

---

## 4. 💻 Frontend Components

### 🧭 DashboardLayout.jsx
- **Purpose:** Wrapper for authenticated pages  
- **Features:**
  - Collapsible sidebar
  - User profile initials
  - Logout functionality
  - Responsive layout
  - Integrated chatbot  

### 🤖 EnergyChatbot.jsx
- **Purpose:** Interactive AI assistant  
- **Features:**  
  - Floating chat UI  
  - Predefined responses  
  - Real-time messaging  
  - Collapsible chat window  

### 📊 Dashboard.jsx
- Personalized greeting  
- Key metrics cards  
- Usage charts  
- Smart insights panel  

### 🔌 Appliances.jsx
- Manage appliances with CRUD  
- Sortable data table  
- Form validation and loading states  

### 📈 Analytics.jsx
- Summary metrics and charts  
- Daily/weekly breakdowns  
- AI-generated insights  

### 🔐 Login.jsx
- User authentication  
- JWT token management  
- Password visibility toggle  

---

## 5. 🧾 Backend API

### 🔑 Authentication Endpoints

#### `POST /auth/signup`
Create a new user  
**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
POST /auth/login
Authenticate and return a JWT
Body:

json
Copy code
{
  "email": "string",
  "password": "string"
}
Response:

json
Copy code
{
  "access_token": "jwt_token_string",
  "username": "user_name",
  "email": "user_email"
}
⚙️ Appliance Management Endpoints
Method	Endpoint	Description
GET	/appliances/	Retrieve all appliances
POST	/appliances/	Add a new appliance
PATCH	/appliances/{id}	Update appliance info
DELETE	/appliances/{id}	Delete an appliance

Example POST Body:

json
Copy code
{
  "name": "Refrigerator",
  "power_rating": 150.0,
  "hours_per_day": 24.0
}
📊 Analytics Endpoints
GET /analytics/
Fetch comprehensive energy analytics
Response Example:

json
Copy code
{
  "summary": {
    "total_kwh": 120.5,
    "total_cost": 24.1,
    "top_appliance": "Air Conditioner"
  },
  "daily_data": [...],
  "insights": ["Turn off devices not in use"]
}
6. 🗃️ Database Schema
🧍 Users
Column	Type	Description
id	INTEGER	Primary key
username	VARCHAR(50)	Unique username
email	VARCHAR(100)	User email
password	VARCHAR(200)	Hashed password

⚙️ Appliances
Column	Type	Description
id	INTEGER	Appliance ID
name	VARCHAR(100)	Appliance name
power_rating	FLOAT	Power in watts
hours_per_day	FLOAT	Usage hours per day
user_id	INTEGER	Foreign key (Users)

📅 ApplianceUsage
Column	Type	Description
id	INTEGER	Record ID
user_id	INTEGER	Foreign key (Users)
appliance_id	INTEGER	Foreign key (Appliances)
date	DATE	Usage date
hour	INTEGER	Hour (0–23)
usage	FLOAT	Energy used (kWh)

7. 🔐 Authentication & Security
Security Features
JWT Authentication

Password hashing with bcrypt

Protected routes using middleware

CORS configuration

Input validation

User-specific data isolation

Authentication Flow
User logs in

Server validates credentials

JWT token generated with user ID

Token sent to client

Token included in all API requests

Energy Calculation Formulas
pgsql
Copy code
Daily Usage (kWh) = Power (kW) × Hours
Weekly Usage = Daily × 7
Monthly Usage = Daily × 30
Energy Cost = Usage × $0.20
CO₂ Emissions (kg) = Usage × 0.5
8. 🚀 Deployment Guide
Prerequisites
Node.js 18+

Python 3.8+

Git

Frontend
bash
Copy code
cd client
npm install
npm run dev
npm run build
npm run preview
Backend
bash
Copy code
cd server
pip install -r requirements.txt
python run.py
Server: http://127.0.0.1:5000

Environment Configuration
Frontend .env

ini
Copy code
VITE_API_URL=http://127.0.0.1:5000
Backend config.py

python
Copy code
SECRET_KEY = "your-secret-key"
SQLALCHEMY_DATABASE_URI = "sqlite:///instance/db.sqlite3"
JWT_SECRET_KEY = "your-jwt-secret-key"
9. 🧪 Testing Strategy
Frontend
✅ Component Unit Tests

✅ Integration Tests

✅ End-to-End (E2E) Workflows

✅ Accessibility Tests

Backend
✅ API Endpoint Tests

✅ Database Model Tests

✅ Authentication Flow Tests

✅ Load & Performance Tests

10. 🔮 Future Enhancements
Planned Features
🔴 Real-time Monitoring: WebSocket integration

📱 Mobile App: React Native version

🧠 Machine Learning: Predictive analytics

🏠 Smart Home Integration: IoT device control

👥 Social Features: Community energy challenges

🎯 Gamification: Energy-saving rewards

Technical Improvements
Microservices architecture

Docker containerization

CI/CD pipelines

Advanced logging and monitoring

Automated database backups

🌿 Impact
By empowering users to manage and reduce their energy usage, the Smart Energy Tracker supports UN SDG 13 – Climate Action, promoting sustainable living and reducing global carbon emissions.

