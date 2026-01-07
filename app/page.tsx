'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	useEffect(() => {
		router.push('/home')
	}, [router])

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">HRMS</h1>
				<p className="text-gray-600 mb-8">Human Resource Management System</p>
				<p className="text-sm text-gray-500">Redirecting...</p>
			</div>
		</main>
	)
}
