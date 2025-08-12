'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authAPI } from '@/lib/api'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  created_at: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    first_name: string
    last_name: string
    email: string
    password: string
  }) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('access_token')
        if (token) {
          const userData = await authAPI.getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        // Token might be expired, clear it
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password)
      
      // Store tokens
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      
      // Get user data
      const userData = await authAPI.getCurrentUser()
      setUser(userData)
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: {
    first_name: string
    last_name: string
    email: string
    password: string
  }) => {
    try {
      const response = await authAPI.register(userData)
      
      // Store tokens
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      
      // Get user data
      const userDataResponse = await authAPI.getCurrentUser()
      setUser(userDataResponse)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  const updateUser = async (userData: Partial<User>) => {
    try {
      const updatedUser = await authAPI.updateProfile(userData)
      setUser(updatedUser)
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
