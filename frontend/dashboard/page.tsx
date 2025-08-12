'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, User, Target, TrendingUp, BookOpen, Award, 
  Bell, Settings, LogOut, Search, Filter, Plus,
  BarChart3, PieChart, Calendar, Clock, Star,
  ArrowUp, ArrowDown, ChevronRight, ExternalLink
} from 'lucide-react'

const DashboardPage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    currentRole: 'Software Developer',
    targetRole: 'Senior Full Stack Developer',
    skillsCompleted: 12,
    totalSkills: 18,
    progressPercentage: 67
  })

  const [careerRecommendations, setCareerRecommendations] = useState([
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      match: 95,
      salary: '$120k - $160k',
      location: 'San Francisco, CA',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      timeToAchieve: '6 months'
    },
    {
      id: 2,
      title: 'Frontend Architect',
      company: 'Design Studio',
      match: 87,
      salary: '$110k - $140k',
      location: 'Remote',
      skills: ['React', 'Vue.js', 'System Design', 'Leadership'],
      timeToAchieve: '8 months'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'Cloud Solutions',
      match: 78,
      salary: '$100k - $130k',
      location: 'New York, NY',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      timeToAchieve: '12 months'
    }
  ])

  const [skillGaps, setSkillGaps] = useState([
    { skill: 'System Design', current: 40, target: 80, priority: 'High' },
    { skill: 'Leadership', current: 30, target: 70, priority: 'Medium' },
    { skill: 'AWS Certification', current: 60, target: 90, priority: 'High' },
    { skill: 'TypeScript', current: 70, target: 85, priority: 'Low' }
  ])

  const [recentActivity, setRecentActivity] = useState([
    { 
      id: 1, 
      type: 'skill_completed', 
      message: 'Completed "Advanced React Patterns" course',
      time: '2 hours ago',
      icon: <Award className="w-4 h-4" />
    },
    {
      id: 2,
      type: 'recommendation_new',
      message: 'New career recommendation: Product Manager',
      time: '1 day ago',
      icon: <Target className="w-4 h-4" />
    },
    {
      id: 3,
      type: 'skill_progress',
      message: 'Progress update: System Design (40% → 45%)',
      time: '3 days ago',
      icon: <TrendingUp className="w-4 h-4" />
    }
  ])

  const [stats, setStats] = useState({
    totalApplications: 23,
    interviewsScheduled: 5,
    skillsInProgress: 4,
    certificationsEarned: 8
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Career Recommender</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search jobs, skills..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.currentRole}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            You're {user.progressPercentage}% closer to becoming a {user.targetRole}
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">12% from last week</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{stats.interviewsScheduled}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">25% from last week</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skills in Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.skillsInProgress}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-600">avg. 2hrs/day</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certifications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.certificationsEarned}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-gray-600">Professional level</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Career Recommendations</h2>
                <button className="btn-secondary flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>

              <div className="space-y-4">
                {careerRecommendations.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                            job.match >= 90 ? 'bg-green-100 text-green-800' :
                            job.match >= 80 ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {job.match}% match
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                        <p className="text-lg font-semibold text-green-600 mb-3">{job.salary}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          Time to achieve: {job.timeToAchieve}
                        </p>
                      </div>
                      
                      <button className="ml-4 btn-primary flex items-center">
                        Apply
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="btn-secondary">
                  View All Recommendations
                </button>
              </div>
            </motion.div>

            {/* Skill Gap Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Skill Gap Analysis</h2>
                <button className="btn-primary flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </button>
              </div>

              <div className="space-y-4">
                {skillGaps.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{skill.skill}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        skill.priority === 'High' ? 'bg-red-100 text-red-800' :
                        skill.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {skill.priority} Priority
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Current: {skill.current}%</span>
                        <span>Target: {skill.target}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${skill.current}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {skill.target - skill.current}% to go
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Start Learning →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
              
              <div className="text-center mb-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      className="text-blue-600"
                      strokeDasharray={`${user.progressPercentage * 2.51} 251`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{user.progressPercentage}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {user.skillsCompleted} of {user.totalSkills} skills completed
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Role</span>
                  <span className="font-medium">{user.currentRole}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target Role</span>
                  <span className="font-medium">{user.targetRole}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Time</span>
                  <span className="font-medium text-blue-600">6 months</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Activity
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center">
                  <Target className="w-4 h-4 mr-2" />
                  Take Skill Assessment
                </button>
                <button className="w-full btn-secondary flex items-center justify-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </button>
                <button className="w-full btn-secondary flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
