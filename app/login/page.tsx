'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/lib/hooks'

export default function LoginPage() {
	const router = useRouter()
	const { login, loading } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		try {
			await login(email, password)
			router.push('/home')
		} catch (err) {
			setError('Invalid email or password')
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-center text-3xl">HRMS</CardTitle>
					<p className="text-center text-gray-600 text-sm mt-2">Human Resource Management System</p>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							label="Email"
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<Input
							label="Password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						{error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

						<Button type="submit" variant="solid" size="lg" loading={loading} className="w-full">
							Sign In
						</Button>

						<p className="text-center text-sm text-gray-600">
							Demo credentials: admin@example.com / password
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
