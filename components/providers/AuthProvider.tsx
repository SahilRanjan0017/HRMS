'use client'

import React, { useEffect } from 'react'
import { AuthContext, useAuthState } from '@/lib/hooks'

interface AuthProviderProps {
	children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const authState = useAuthState()

	useEffect(() => {
		authState.initialize('MEG-EMP-001')
	}, [])

	return (
		<AuthContext.Provider value={{ ...authState, isAdmin: authState.isAdmin }}>
			{children}
		</AuthContext.Provider>
	)
}
