'use client'

import { useState, useEffect, useCallback, useContext, createContext } from 'react'

export interface User {
	name: string
	full_name: string
	first_name: string
	user_image?: string
	email?: string
}

export interface Employee {
	name: string
	employee_name: string
	user_id: string
	company: string
	date_of_joining: string
	department: string
	designation: string
}

interface AuthContextType {
	user: User | null
	employee: Employee | null
	isLoggedIn: boolean
	isAdmin: boolean
	loading: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	initialize: (userId: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}

export const useAuthState = () => {
	const [user, setUser] = useState<User | null>(null)
	const [employee, setEmployee] = useState<Employee | null>(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [loading, setLoading] = useState(true)

	const initialize = useCallback(async (userId: string) => {
		try {
			setLoading(true)
			// Mock initialization for demo
			const mockUser: User = {
				name: 'Administrator',
				full_name: 'Sahil Ranjan',
				first_name: 'Sahil',
				user_image: 'https://github.com/shadcn.png',
				email: 'sahil@example.com',
			}

			const mockEmployee: Employee = {
				name: 'MEG-EMP-001',
				employee_name: 'Sahil Ranjan',
				user_id: 'Administrator',
				company: 'HRMS',
				date_of_joining: '2024-01-01',
				department: 'Management',
				designation: 'Product Lead',
			}

			setUser(mockUser)
			setEmployee(mockEmployee)
			setIsLoggedIn(true)
		} catch (error) {
			console.error('Failed to initialize auth:', error)
		} finally {
			setLoading(false)
		}
	}, [])

	const login = useCallback(async (email: string, password: string) => {
		try {
			setLoading(true)
			// Mock login - replace with real API call in Phase 2
			await new Promise((resolve) => setTimeout(resolve, 500))

			const mockUser: User = {
				name: email.split('@')[0],
				full_name: 'Test User',
				first_name: 'Test',
				email,
			}

			setUser(mockUser)
			setIsLoggedIn(true)
		} catch (error) {
			console.error('Login failed:', error)
			throw error
		} finally {
			setLoading(false)
		}
	}, [])

	const logout = useCallback(async () => {
		try {
			setLoading(true)
			// Mock logout
			await new Promise((resolve) => setTimeout(resolve, 300))

			setUser(null)
			setEmployee(null)
			setIsLoggedIn(false)
		} catch (error) {
			console.error('Logout failed:', error)
			throw error
		} finally {
			setLoading(false)
		}
	}, [])

	return {
		user,
		employee,
		isLoggedIn,
		loading,
		login,
		logout,
		initialize,
		isAdmin: user?.name === 'Administrator',
	}
}
