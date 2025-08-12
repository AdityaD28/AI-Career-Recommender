'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Plus, X, ArrowRight, Sparkles, Target, User, LogOut } from 'lucide-react'

const HomePage = () => {
  const [user, setUser] = useState<any>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [currentSkill, setCurrentSkill] = useState('')
  const [currentInterest, setCurrentInterest] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('beginner')
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setSkills(parsedUser.skills || [])
      setInterests(parsedUser.interests || [])
      setExperienceLevel(parsedUser.experience_level || 'beginner')
    }
  }, [])

  const skillSuggestions = [
    'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Machine Learning',
    'Project Management', 'UI/UX Design', 'Data Analysis', 'AWS', 'Docker',
    'Digital Marketing', 'Business Analysis', 'Graphic Design', 'Java'
  ]

  const interestSuggestions = [
    'Web Development', 'Data Science', 'Artificial Intelligence', 'Mobile Apps',
    'Cloud Computing', 'Cybersecurity', 'Game Development', 'E-commerce',
    'Healthcare Tech', 'Finance', 'Education', 'Marketing', 'Design'
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setSkills([])
    setInterests([])
    setRecommendations([])
  }

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill])
      setCurrentSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const addInterest = (interest: string) => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest])
      setCurrentInterest('')
    }
  }

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove))
  }

  const updateProfile = async () => {
    if (!user) return

    try {
      const response = await fetch(`http://localhost:8000/user/${user.id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills,
          interests,
          experience_level: experienceLevel
        })
      })
      
      if (response.ok) {
        // Update local storage
        const updatedUser = { ...user, skills, interests, experience_level: experienceLevel }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const getRecommendations = async () => {
    if (skills.length === 0) return

    setIsLoading(true)
    try {
      // First update the profile
      await updateProfile()
      
      // Then get recommendations
      const response = await fetch('http://localhost:8000/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills,
          interests,
          experience_level: experienceLevel
        })
      })
      
      const data = await response.json()
      setRecommendations(data.recommendations || [])
      
      // Save recommendations for logged-in user
      if (user && data.recommendations) {
        await fetch(`http://localhost:8000/recommendations/save/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recommendations: data.recommendations
          })
        })
      }
    } catch (error) {
      console.error('Error getting recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Brain className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">AI Career Recommender</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a 
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  How It Works
                </a>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  About
                </a>
                <Link href="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </div>
              <div className="md:hidden flex space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Your Perfect
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Career Path
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              AI-powered career recommendations based on your skills, interests, and experience level
            </p>

            {/* Project Details Section */}
            <motion.div
              id="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 pt-20 -mt-20"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Our Platform
                </span>
              </h2>
              
              {/* Platform Overview */}
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Mission Statement */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To democratize career guidance by leveraging artificial intelligence to provide personalized, 
                    data-driven career recommendations that help individuals discover their ideal professional path 
                    and achieve their career aspirations.
                  </p>
                </div>

                {/* Platform Stats */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                    <div className="text-gray-600">Career Categories</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                    <div className="text-gray-600">Job Profiles</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">AI</div>
                    <div className="text-gray-600">Powered Matching</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">Free</div>
                    <div className="text-gray-600">Always</div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Target className="w-10 h-10 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Why Choose AI Career Recommender?</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                          <Brain className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <strong className="text-gray-900 text-lg">AI-Powered Matching</strong>
                          <p className="text-gray-600 mt-1">Advanced machine learning algorithms analyze your skills, interests, and experience to find the most compatible career paths.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <strong className="text-gray-900 text-lg">Personalized Experience</strong>
                          <p className="text-gray-600 mt-1">Every recommendation is tailored specifically to your unique profile, ensuring relevant and actionable career guidance.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                          <Target className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <strong className="text-gray-900 text-lg">Comprehensive Database</strong>
                          <p className="text-gray-600 mt-1">Access detailed information about careers across technology, business, healthcare, finance, and many other industries.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                          <Sparkles className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <strong className="text-gray-900 text-lg">Real-Time Insights</strong>
                          <p className="text-gray-600 mt-1">Get up-to-date salary ranges, job market trends, and skill requirements for each recommended career path.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 mt-1">
                          <ArrowRight className="w-4 h-4 text-pink-600" />
                        </div>
                        <div>
                          <strong className="text-gray-900 text-lg">Career Growth Paths</strong>
                          <p className="text-gray-600 mt-1">Discover not just current opportunities, but potential career progression routes and skill development recommendations.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                          <Plus className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <strong className="text-gray-900 text-lg">Completely Free</strong>
                          <p className="text-gray-600 mt-1">No hidden costs, premium tiers, or subscription fees. Quality career guidance accessible to everyone, everywhere.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technology Behind */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">The Technology Behind Our Platform</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Machine Learning</h4>
                      <p className="text-gray-600 text-sm">Sophisticated algorithms that learn and improve recommendation accuracy over time.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Skill Matching</h4>
                      <p className="text-gray-600 text-sm">Advanced matching system that correlates your skills with job requirements across industries.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Data Analytics</h4>
                      <p className="text-gray-600 text-sm">Real-time analysis of job market data to provide current and relevant career insights.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              id="how-it-works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-8 pt-20 -mt-20"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  How It Works
                </span>
              </h2>
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sign Up</h4>
                    <p className="text-sm text-gray-600">Create your free account in seconds</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Add Skills</h4>
                    <p className="text-sm text-gray-600">Input your technical and soft skills</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Set Interests</h4>
                    <p className="text-sm text-gray-600">Tell us what excites you professionally</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-orange-600 font-bold text-lg">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Get Recommendations</h4>
                    <p className="text-sm text-gray-600">Receive AI-powered career matches</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-pink-600 font-bold text-lg">5</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Explore Paths</h4>
                    <p className="text-sm text-gray-600">Review detailed career information and requirements</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              id="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 pt-20 -mt-20"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Platform Features
                </span>
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1">Smart Matching</h4>
                  <p className="text-sm text-gray-600">Advanced AI algorithms match your skills to career opportunities</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1">Match Scoring</h4>
                  <p className="text-sm text-gray-600">See percentage compatibility for each career recommendation</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1">Career Insights</h4>
                  <p className="text-sm text-gray-600">Detailed job descriptions, salary ranges, and skill requirements</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto"
            >
              <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Create an account to save your profile and get personalized career recommendations
              </p>
              <Link 
                href="/register" 
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <User className="w-5 h-5 mr-2" />
                Create Account
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-blue-400" />
                  <span className="ml-2 text-xl font-bold">AI Career Recommender</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Discover your perfect career path with AI-powered recommendations based on your skills and interests.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors">How It Works</a></li>
                  <li><a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a></li>
                  <li><Link href="/register" className="text-gray-300 hover:text-blue-400 transition-colors">Sign Up</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 AI Career Recommender. All rights reserved. Made with ❤️ for your career journey.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Career Recommender</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => {
                  const element = document.getElementById('saved-results');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                History
              </button>
              <span className="text-gray-600 text-sm">Welcome, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-md transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <span className="text-gray-600">Hi, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-md transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Hello {user.name}!
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Let's Find Your Career
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tell us about your skills and interests to get personalized AI career recommendations
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
          </div>

          {/* Experience Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <div className="flex space-x-4">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setExperienceLevel(level)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    experienceLevel === level
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Skills
            </label>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill(currentSkill)}
                placeholder="Add a skill"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => addSkill(currentSkill)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Skill Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => addSkill(suggestion)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Skills */}
            {skills.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Your skills:</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interests Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Interests
            </label>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={currentInterest}
                onChange={(e) => setCurrentInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addInterest(currentInterest)}
                placeholder="Add an interest"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => addInterest(currentInterest)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Interest Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Popular interests:</p>
              <div className="flex flex-wrap gap-2">
                {interestSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => addInterest(suggestion)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Interests */}
            {interests.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Your interests:</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <div
                      key={interest}
                      className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                      <button
                        onClick={() => removeInterest(interest)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Get Recommendations Button */}
          <button
            onClick={getRecommendations}
            disabled={skills.length === 0 || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Target className="w-5 h-5 mr-2" />
                Get AI Career Recommendations
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </motion.div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <motion.div
            id="saved-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 text-green-600 mr-2" />
              Your Career Recommendations
            </h3>
            
            <div className="grid gap-6">
              {recommendations.slice(0, 5).map((career, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold text-gray-900">{career.title}</h4>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {Math.round(career.match_score * 100)}% match
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{career.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {career.required_skills && career.required_skills.slice(0, 4).map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Industry: {career.industry || 'Technology'}</span>
                    <span>Avg. Salary: {career.salary_range || '$60k - $120k'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Results Saved Successfully!</span>
                </div>
                <p className="text-green-700 text-sm">
                  Your personalized career recommendations are now saved to your profile. Access them anytime through "History" in the navigation.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* No Results Section */}
        {recommendations.length === 0 && skills.length > 0 && (
          <motion.div
            id="saved-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center"
          >
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Get Your Recommendations?</h3>
            <p className="text-gray-600 mb-4">
              Click the "Get Career Recommendations" button above to discover careers that match your skills and interests.
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="ml-2 text-lg font-bold">AI Career Recommender</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 AI Career Recommender. Made with ❤️ for your career journey.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
