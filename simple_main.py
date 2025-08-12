from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import json
import random

from simple_auth import user_manager

# Simple Career Recommender Class
class SimpleCareerRecommender:
    def __init__(self):
        self.careers = [
            {
                "title": "Software Engineer",
                "description": "Develop and maintain software applications and systems",
                "required_skills": ["Python", "JavaScript", "SQL", "Git"],
                "industry": "Technology",
                "salary_range": "$70k - $130k",
                "match_keywords": ["python", "javascript", "programming", "coding", "software", "development"]
            },
            {
                "title": "Data Scientist",
                "description": "Analyze complex data to help organizations make decisions",
                "required_skills": ["Python", "Machine Learning", "Statistics", "SQL", "Data Analysis"],
                "industry": "Technology/Analytics",
                "salary_range": "$80k - $150k",
                "match_keywords": ["python", "machine learning", "data", "statistics", "analytics", "sql"]
            },
            {
                "title": "Frontend Developer",
                "description": "Create user interfaces and web experiences",
                "required_skills": ["JavaScript", "React", "HTML", "CSS", "UI/UX Design"],
                "industry": "Technology",
                "salary_range": "$60k - $120k",
                "match_keywords": ["javascript", "react", "html", "css", "frontend", "ui", "ux"]
            },
            {
                "title": "Product Manager",
                "description": "Lead product development and strategy",
                "required_skills": ["Project Management", "Business Analysis", "Communication", "Strategy"],
                "industry": "Technology/Business",
                "salary_range": "$90k - $160k",
                "match_keywords": ["management", "product", "strategy", "business", "communication"]
            },
            {
                "title": "Digital Marketing Specialist",
                "description": "Develop and execute digital marketing campaigns",
                "required_skills": ["Digital Marketing", "SEO", "Social Media", "Analytics", "Content Creation"],
                "industry": "Marketing",
                "salary_range": "$45k - $85k",
                "match_keywords": ["marketing", "seo", "social media", "analytics", "content"]
            },
            {
                "title": "DevOps Engineer",
                "description": "Manage infrastructure and deployment pipelines",
                "required_skills": ["AWS", "Docker", "Python", "Linux", "CI/CD"],
                "industry": "Technology",
                "salary_range": "$75k - $140k",
                "match_keywords": ["aws", "docker", "devops", "linux", "automation", "cloud"]
            },
            {
                "title": "UX Designer",
                "description": "Design user experiences for digital products",
                "required_skills": ["UI/UX Design", "Figma", "User Research", "Prototyping"],
                "industry": "Design/Technology",
                "salary_range": "$55k - $110k",
                "match_keywords": ["design", "ux", "ui", "figma", "prototyping", "user"]
            },
            {
                "title": "Business Analyst",
                "description": "Analyze business processes and recommend improvements",
                "required_skills": ["Business Analysis", "SQL", "Excel", "Project Management"],
                "industry": "Business/Consulting",
                "salary_range": "$55k - $95k",
                "match_keywords": ["business", "analysis", "sql", "excel", "consulting"]
            },
            {
                "title": "Machine Learning Engineer",
                "description": "Build and deploy machine learning models",
                "required_skills": ["Python", "Machine Learning", "TensorFlow", "AWS", "Statistics"],
                "industry": "Technology/AI",
                "salary_range": "$90k - $170k",
                "match_keywords": ["machine learning", "python", "tensorflow", "ai", "deep learning"]
            },
            {
                "title": "Full Stack Developer",
                "description": "Develop both frontend and backend applications",
                "required_skills": ["JavaScript", "Node.js", "React", "SQL", "Python"],
                "industry": "Technology",
                "salary_range": "$65k - $125k",
                "match_keywords": ["javascript", "node.js", "react", "fullstack", "full stack", "backend"]
            }
        ]
    
    def get_recommendations(self, skills: List[str], experience_level: str = "beginner", interests: List[str] = None):
        """Get career recommendations based on skills and experience"""
        if not skills:
            return []
        
        recommendations = []
        skills_lower = [skill.lower() for skill in skills]
        
        for career in self.careers:
            match_score = self._calculate_match_score(skills_lower, career, experience_level)
            if match_score > 0.1:  # Only include if there's some match
                career_copy = career.copy()
                career_copy['match_score'] = match_score
                recommendations.append(career_copy)
        
        # Sort by match score descending
        recommendations.sort(key=lambda x: x['match_score'], reverse=True)
        return recommendations[:10]  # Return top 10
    
    def _calculate_match_score(self, user_skills: List[str], career: dict, experience_level: str):
        """Calculate match score between user skills and career"""
        score = 0.0
        
        # Check skill matches
        career_skills = [skill.lower() for skill in career['required_skills']]
        career_keywords = career['match_keywords']
        
        # Direct skill matches (higher weight)
        for skill in user_skills:
            if skill in career_skills:
                score += 0.3
            elif any(skill in keyword or keyword in skill for keyword in career_keywords):
                score += 0.2
        
        # Experience level adjustment
        experience_multiplier = {
            "beginner": 0.8,
            "intermediate": 1.0,
            "advanced": 1.2
        }.get(experience_level, 1.0)
        
        score *= experience_multiplier
        
        # Normalize score to 0-1 range
        return min(score, 1.0)

app = FastAPI(title="AI Career Recommender", version="2.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize career recommender
career_recommender = SimpleCareerRecommender()

# Pydantic models
class UserRegister(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    skills: List[str]
    interests: List[str]
    experience_level: str

class SkillInput(BaseModel):
    skills: List[str]
    interests: Optional[List[str]] = []
    experience_level: str = "beginner"

@app.get("/")
async def root():
    return {"message": "AI Career Recommender API", "version": "2.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy", "message": "API is running"}

@app.post("/auth/register")
async def register(user_data: UserRegister):
    try:
        result = user_manager.register_user(
            email=user_data.email,
            password=user_data.password,
            name=user_data.name
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/auth/login")
async def login(user_data: UserLogin):
    try:
        result = user_manager.login_user(
            email=user_data.email,
            password=user_data.password
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

@app.get("/user/{user_id}")
async def get_user(user_id: str):
    user = user_manager.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/user/{user_id}/profile")
async def update_profile(user_id: str, profile: UserProfile):
    try:
        result = user_manager.update_user_profile(
            user_id=user_id,
            skills=profile.skills,
            interests=profile.interests,
            experience_level=profile.experience_level
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.post("/recommendations")
async def get_recommendations(skill_input: SkillInput):
    try:
        # Get career recommendations based on skills
        recommendations = career_recommender.get_recommendations(
            skills=skill_input.skills,
            interests=skill_input.interests,
            experience_level=skill_input.experience_level
        )
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommendations/save/{user_id}")
async def save_recommendations(user_id: str, recommendations_data: dict):
    try:
        result = user_manager.save_recommendations(
            user_id=user_id,
            recommendations=recommendations_data.get("recommendations", [])
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/skills/suggestions")
async def get_skill_suggestions():
    """Get list of available skills for suggestions"""
    return {
        "programming": ["Python", "JavaScript", "Java", "C++", "React", "Node.js", "Angular", "Vue.js"],
        "data_science": ["Machine Learning", "Data Analysis", "SQL", "Pandas", "NumPy", "TensorFlow", "PyTorch"],
        "design": ["UI/UX Design", "Graphic Design", "Figma", "Adobe Creative Suite", "Prototyping"],
        "business": ["Project Management", "Business Analysis", "Digital Marketing", "Sales", "Strategy"],
        "technical": ["AWS", "Docker", "Kubernetes", "DevOps", "System Administration", "Cybersecurity"]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
