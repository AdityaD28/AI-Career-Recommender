import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (userData: {
    first_name: string
    last_name: string
    email: string
    password: string
  }) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  updateProfile: async (userData: any) => {
    const response = await api.put('/auth/profile', userData)
    return response.data
  }
}

// Career Recommendations API
export const careerAPI = {
  getRecommendations: async (userId?: number, limit: number = 10) => {
    const response = await api.get('/recommendations', {
      params: { user_id: userId, limit }
    })
    return response.data
  },

  getAllCareers: async () => {
    const response = await api.get('/careers')
    return response.data
  },

  getCareerById: async (id: number) => {
    const response = await api.get(`/careers/${id}`)
    return response.data
  },

  searchCareers: async (query: string) => {
    const response = await api.get('/careers/search', {
      params: { q: query }
    })
    return response.data
  }
}

// Skills API
export const skillsAPI = {
  getAllSkills: async () => {
    const response = await api.get('/skills')
    return response.data
  },

  getUserSkills: async (userId: number) => {
    const response = await api.get(`/skills/user/${userId}`)
    return response.data
  },

  updateUserSkills: async (userId: number, skills: any[]) => {
    const response = await api.put(`/skills/user/${userId}`, { skills })
    return response.data
  },

  getSkillGapAnalysis: async (userId: number, targetCareer: string) => {
    const response = await api.post('/skills/gap-analysis', {
      user_id: userId,
      target_career: targetCareer
    })
    return response.data
  }
}

// Assessments API
export const assessmentAPI = {
  takeAssessment: async (assessmentData: {
    user_id: number
    skills: string[]
    interests: string[]
    experience_level: string
    preferred_industries: string[]
  }) => {
    const response = await api.post('/assessment', assessmentData)
    return response.data
  },

  getUserAssessments: async (userId: number) => {
    const response = await api.get(`/assessment/user/${userId}`)
    return response.data
  },

  getAssessmentResults: async (assessmentId: number) => {
    const response = await api.get(`/assessment/${assessmentId}/results`)
    return response.data
  }
}

// Progress Tracking API
export const progressAPI = {
  getUserProgress: async (userId: number) => {
    const response = await api.get(`/progress/user/${userId}`)
    return response.data
  },

  updateProgress: async (userId: number, progressData: {
    skill: string
    current_level: number
    target_level: number
    notes?: string
  }) => {
    const response = await api.post('/progress', {
      user_id: userId,
      ...progressData
    })
    return response.data
  },

  getProgressHistory: async (userId: number, skill?: string) => {
    const response = await api.get(`/progress/user/${userId}/history`, {
      params: { skill }
    })
    return response.data
  }
}

// Analytics API
export const analyticsAPI = {
  getDashboardStats: async (userId: number) => {
    const response = await api.get(`/analytics/dashboard/${userId}`)
    return response.data
  },

  getCareerTrends: async () => {
    const response = await api.get('/analytics/career-trends')
    return response.data
  },

  getSkillDemand: async () => {
    const response = await api.get('/analytics/skill-demand')
    return response.data
  },

  getUserActivity: async (userId: number, limit: number = 10) => {
    const response = await api.get(`/analytics/user-activity/${userId}`, {
      params: { limit }
    })
    return response.data
  }
}

export default api
