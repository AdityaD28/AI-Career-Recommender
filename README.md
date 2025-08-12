# AI Career Recommender

A modern, AI-powered career recommendation platform built with FastAPI backend and Next.js frontend. This application helps users discover their ideal career paths through intelligent skill matching and personalized recommendations.

![Python](https://img.shields.io/badge/python-v3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

### AI-Powered Career Matching
- **Intelligent Recommendations**: Advanced ML algorithms using TF-IDF vectorization and cosine similarity
- **Skill-Based Analysis**: Precise career matching based on user skills and interests
- **Experience Consideration**: Tailored recommendations for different experience levels
- **Real-time Processing**: Instant career suggestions with high accuracy scores

### Modern Web Application
- **React Frontend**: Built with Next.js 14 and TypeScript
- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Dashboard**: Real-time data visualization and analytics
- **User Authentication**: Secure login/register with JWT tokens
- **Progressive Web App**: Installable with offline capabilities

### Comprehensive Analytics
- **Skill Gap Analysis**: Visual representation of skill development needs
- **Progress Tracking**: Monitor learning journey with interactive charts
- **Market Trends**: Industry insights and demand forecasting
- **Salary Intelligence**: Data-driven compensation analysis
- **Performance Metrics**: User engagement and success tracking

### Personalized Learning Paths
- **Custom Roadmaps**: Tailored learning paths for career goals
- **Resource Curation**: Curated courses, books, and learning materials
- **Timeline Estimation**: Realistic time-to-goal projections
- **Milestone Tracking**: Achievement system with progress rewards
- **Adaptive Learning**: Paths that adjust based on progress

### Multiple Interfaces
- **Web Application**: Modern React frontend with dashboard
- **Mobile Responsive**: Optimized mobile experience
- **🖥CLI Interface**: Rich terminal interface with animations
- **Dashboard**: Interactive Streamlit analytics dashboard
- **REST API**: Comprehensive FastAPI backend

## Project Structure

```
ai_career_recommender/
├── simple_main.py              # FastAPI backend server
├── simple_auth.py              # Authentication & user management
├── career_data.json            # Career information database
├── users.json                  # User registry (auto-generated)
├── user_data/                  # User profile storage
│   ├── user_001/
│   │   ├── profile.json
│   │   └── recommendations.json
│   └── ...
├── frontend/                   # Next.js frontend application
│   ├── app/
│   │   ├── page.tsx           # Main application page
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── components/            # React components
│   ├── lib/                   # API utilities
│   ├── package.json
│   ├── tailwind.config.js
│   └── next.config.js
└── README.md                  # Project documentation
```

## Quick Start

### Prerequisites
- **Python 3.8+**
- **Node.js 18+**
- **npm or yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdityaD28/AI-Career-Recommender
   cd ai_career_recommender
   ```

2. **Backend Setup**
   ```bash
   # Install Python dependencies
   pip install fastapi uvicorn python-multipart

   # Start the FastAPI backend server
   uvicorn simple_main:app --host 0.0.0.0 --port 8000 --reload
   ```

3. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd frontend

   # Install dependencies
   npm install

   # Start the development server
   npm run dev
   ```

4. **Access the Application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs

## Usage

### Web Application (Recommended)
1. Open http://localhost:3000
2. Register or login to your account
3. Complete the skill assessment
4. Explore your personalized career recommendations
5. Track your progress on the interactive dashboard

### Command Line Interface
```bash
# Modern CLI with Rich interface
python modern_cli.py

# Follow the interactive prompts
```

### Analytics Dashboard
```bash
# Streamlit dashboard
python -m streamlit run dashboard.py

# Opens at: http://localhost:8501
```

### API Access
```bash
# View API documentation
curl http://localhost:8000/docs

# Get career recommendations
curl http://localhost:8000/recommendations?user_id=1
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0+
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.5
- **Animations**: Framer Motion 10.16.4
- **Icons**: Lucide React
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Forms**: React Hook Form

### Backend
- **Framework**: FastAPI 0.104.1
- **Language**: Python 3.8+
- **Database**: SQLAlchemy (SQLite/PostgreSQL)
- **Authentication**: JWT with automatic refresh
- **API Documentation**: OpenAPI/Swagger
- **Async Support**: Python asyncio
- **Data Validation**: Pydantic

### Machine Learning
- **Core**: scikit-learn
- **Text Processing**: TF-IDF Vectorization
- **Similarity**: Cosine Similarity
- **Data**: NumPy, Pandas
- **Preprocessing**: Custom pipelines

### 🛠Development Tools
- **Package Management**: npm, pip
- **Code Quality**: ESLint, Prettier
- **Type Checking**: TypeScript, mypy
- **Testing**: Jest, pytest
- **Version Control**: Git
- **Deployment**: Docker, Vercel, AWS

### Additional Interfaces
- **CLI**: Rich (Python terminal UI)
- **Dashboard**: Streamlit
- **Bot**: python-telegram-bot
- **Charts**: Plotly, matplotlib

## API Documentation

### Authentication Endpoints
```http
POST /auth/register      # User registration
POST /auth/login         # User login
```

### User Management Endpoints
```http
GET  /user/{user_id}/profile        # Get user profile
POST /user/{user_id}/profile        # Update user profile
```

### Career Recommendation Endpoints
```http
POST /recommendations               # Get career recommendations
```

### Interactive API Documentation
Visit `http://localhost:8000/docs` for the complete interactive Swagger documentation when the backend server is running.

## Usage

### Starting the Application

1. **Start the Backend Server**
   ```bash
   uvicorn simple_main:app --host 0.0.0.0 --port 8000 --reload
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Using the Career Recommender

1. **Register/Login**: Create an account or log in to your existing account
2. **Complete Your Profile**: Fill in your skills, interests, and career preferences
3. **Get Recommendations**: Receive AI-powered career recommendations based on your profile
4. **View History**: Check your previous recommendations and profile updates

## Development

### Backend Development
- The FastAPI backend uses file-based storage (no database required)
- User data is stored in JSON files in the `user_data/` directory
- Career data is loaded from `career_data.json`
- Authentication is handled via `simple_auth.py`

### Frontend Development
- Built with Next.js 14 and TypeScript
- Uses Tailwind CSS for styling
- API communication handled through custom hooks
- Simplified navigation with History tracking

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## � License

This project is licensed under the MIT License.

## Developed By

* **Aditya Dasappanavar**
* **GitHub:** [AdityaD28](https://github.com/AdityaD28)
* **LinkedIn:** [adityadasappanavar](https://www.linkedin.com/in/adityadasappanavar/)
