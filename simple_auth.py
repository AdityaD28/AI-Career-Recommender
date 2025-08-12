import json
import os
import hashlib
import uuid
from datetime import datetime
from typing import Optional, Dict, List

class UserManager:
    def __init__(self, data_dir: str = "user_data"):
        self.data_dir = data_dir
        self.users_file = os.path.join(data_dir, "users.json")
        self.ensure_data_dir()
    
    def ensure_data_dir(self):
        """Ensure the data directory and files exist"""
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
        
        if not os.path.exists(self.users_file):
            with open(self.users_file, 'w') as f:
                json.dump({}, f)
    
    def hash_password(self, password: str) -> str:
        """Hash password using SHA256"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def register_user(self, email: str, password: str, name: str) -> Dict:
        """Register a new user"""
        # Load existing users
        with open(self.users_file, 'r') as f:
            users = json.load(f)
        
        # Check if user already exists
        if email in users:
            raise ValueError("User already exists")
        
        # Create new user
        user_id = str(uuid.uuid4())
        user_data = {
            "id": user_id,
            "email": email,
            "name": name,
            "password": self.hash_password(password),
            "created_at": datetime.now().isoformat(),
            "skills": [],
            "interests": [],
            "experience_level": "",
            "recommendations": []
        }
        
        # Save user
        users[email] = user_data
        with open(self.users_file, 'w') as f:
            json.dump(users, f, indent=2)
        
        # Create user directory
        user_dir = os.path.join(self.data_dir, user_id)
        os.makedirs(user_dir, exist_ok=True)
        
        return {"success": True, "user_id": user_id, "message": "User registered successfully"}
    
    def login_user(self, email: str, password: str) -> Dict:
        """Login user"""
        with open(self.users_file, 'r') as f:
            users = json.load(f)
        
        if email not in users:
            raise ValueError("User not found")
        
        user = users[email]
        if user["password"] != self.hash_password(password):
            raise ValueError("Invalid password")
        
        return {
            "success": True,
            "user": {
                "id": user["id"],
                "email": user["email"],
                "name": user["name"],
                "skills": user.get("skills", []),
                "interests": user.get("interests", []),
                "experience_level": user.get("experience_level", "")
            }
        }
    
    def update_user_profile(self, user_id: str, skills: List[str], interests: List[str], experience_level: str) -> Dict:
        """Update user profile with skills and interests"""
        with open(self.users_file, 'r') as f:
            users = json.load(f)
        
        # Find user by ID
        user_email = None
        for email, user_data in users.items():
            if user_data["id"] == user_id:
                user_email = email
                break
        
        if not user_email:
            raise ValueError("User not found")
        
        # Update user data
        users[user_email]["skills"] = skills
        users[user_email]["interests"] = interests
        users[user_email]["experience_level"] = experience_level
        users[user_email]["updated_at"] = datetime.now().isoformat()
        
        # Save updated data
        with open(self.users_file, 'w') as f:
            json.dump(users, f, indent=2)
        
        return {"success": True, "message": "Profile updated successfully"}
    
    def get_user_by_id(self, user_id: str) -> Optional[Dict]:
        """Get user by ID"""
        with open(self.users_file, 'r') as f:
            users = json.load(f)
        
        for email, user_data in users.items():
            if user_data["id"] == user_id:
                return {
                    "id": user_data["id"],
                    "email": user_data["email"],
                    "name": user_data["name"],
                    "skills": user_data.get("skills", []),
                    "interests": user_data.get("interests", []),
                    "experience_level": user_data.get("experience_level", "")
                }
        return None
    
    def save_recommendations(self, user_id: str, recommendations: List[Dict]) -> Dict:
        """Save career recommendations for user"""
        with open(self.users_file, 'r') as f:
            users = json.load(f)
        
        # Find and update user
        for email, user_data in users.items():
            if user_data["id"] == user_id:
                users[email]["recommendations"] = recommendations
                users[email]["last_recommendation"] = datetime.now().isoformat()
                break
        
        # Save updated data
        with open(self.users_file, 'w') as f:
            json.dump(users, f, indent=2)
        
        # Also save to user's individual file
        user_dir = os.path.join(self.data_dir, user_id)
        recommendations_file = os.path.join(user_dir, "recommendations.json")
        with open(recommendations_file, 'w') as f:
            json.dump({
                "recommendations": recommendations,
                "generated_at": datetime.now().isoformat()
            }, f, indent=2)
        
        return {"success": True, "message": "Recommendations saved successfully"}

# Global instance
user_manager = UserManager()
