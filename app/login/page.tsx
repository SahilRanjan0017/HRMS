"use client"

import React, { useState } from "react"
import { useAuth } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail, Lock, ArrowRight, Briefcase, Users, TrendingUp, Award } from "lucide-react"

const features = [
	{ icon: Users, title: "Employee Management", description: "Complete employee directory" },
	{ icon: Briefcase, title: "Recruitment", description: "Hire the best talent" },
	{ icon: TrendingUp, title: "Performance", description: "Track & develop employees" },
	{ icon: Award, title: "Recognition", description: "Reward achievements" },
]

export default function LoginPage() {
	const router = useRouter()
	const { login } = useAuth()
	const [email, setEmail] = useState("sahil@company.com")
	const [password, setPassword] = useState("password")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError("")

		try {
			await login(email, password)
			router.push("/home")
		} catch (err) {
			setError("Login failed. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
			{/* Left Side - Features */}
			<div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-12 text-white">
				<div>
					<div className="flex items-center gap-3 mb-12">
						<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
							<span className="text-blue-600 font-bold text-xl">HR</span>
						</div>
						<span className="text-3xl font-bold">HRMS</span>
					</div>

					<h1 className="text-5xl font-bold mb-6 leading-tight">
						Modern HR Management System
					</h1>
					<p className="text-blue-100 text-lg mb-12">
						Streamline your human resources operations with our comprehensive HRMS platform
					</p>

					<div className="grid grid-cols-2 gap-6">
						{features.map((feature, idx) => {
							const Icon = feature.icon
							return (
								<div key={idx} className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
									<Icon className="w-8 h-8 mb-3 text-blue-200" />
									<h3 className="font-semibold mb-1">{feature.title}</h3>
									<p className="text-sm text-blue-100">{feature.description}</p>
								</div>
							)
						})}
					</div>
				</div>

				<div className="text-blue-100">
					<p className="text-sm">🚀 Trusted by 1000+ companies</p>
				</div>
			</div>

			{/* Right Side - Login Form */}
			<div className="flex flex-col justify-center items-center p-8">
				<div className="w-full max-w-md">
					{/* Mobile Logo */}
					<div className="lg:hidden flex items-center justify-center gap-2 mb-8">
						<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold">HR</span>
						</div>
						<span className="text-2xl font-bold text-gray-900">HRMS</span>
					</div>

					<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Welcome Back
						</h2>
						<p className="text-gray-600 mb-8">
							Sign in to your account to continue
						</p>

						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
								{error}
							</div>
						)}

						<form onSubmit={handleLogin} className="space-y-5">
							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-2">
									Email Address
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
									<Input
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-2">
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
									<Input
										type="password"
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between text-sm">
								<label className="flex items-center gap-2 text-gray-700 font-medium">
									<input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
									Remember me
								</label>
								<a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
									Forgot password?
								</a>
							</div>

							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
							>
								{loading ? (
									<>
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										Signing in...
									</>
								) : (
									<>
										Sign In
										<ArrowRight className="w-4 h-4" />
									</>
								)}
							</Button>
						</form>

						<div className="mt-6 text-center text-sm text-gray-600">
							<p>Demo credentials:</p>
							<p className="font-mono text-xs mt-2 bg-gray-50 p-3 rounded text-gray-700">
								Email: sahil@company.com<br />
								Password: password
							</p>
						</div>
					</div>

					<p className="text-center text-sm text-gray-600 mt-6">
						Protected by enterprise-grade security
					</p>
				</div>
			</div>
		</div>
	)
}
