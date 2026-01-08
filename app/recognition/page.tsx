"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Star, Trophy, Gift, TrendingUp } from "lucide-react"

interface Recognition {
	id: string
	recipientName: string
	awardType: string
	reason: string
	givenBy: string
	date: string
	badge: string
}

interface Badge {
	id: string
	name: string
	description: string
	recipientCount: number
	icon: string
}

const mockRecognitions: Recognition[] = [
	{
		id: "1",
		recipientName: "Sahil Ranjan",
		awardType: "Star Performer",
		reason: "Outstanding product delivery",
		givenBy: "CEO",
		date: "2024-01-08",
		badge: "⭐",
	},
	{
		id: "2",
		recipientName: "Priya Sharma",
		awardType: "Team Player",
		reason: "Excellent collaboration",
		givenBy: "Head of HR",
		date: "2024-01-05",
		badge: "🤝",
	},
	{
		id: "3",
		recipientName: "Amit Kumar",
		awardType: "Innovation Award",
		reason: "New feature implementation",
		givenBy: "Engineering Lead",
		date: "2024-01-03",
		badge: "💡",
	},
]

const mockBadges: Badge[] = [
	{
		id: "1",
		name: "Star Performer",
		description: "Exceptional performance",
		recipientCount: 5,
		icon: "⭐",
	},
	{
		id: "2",
		name: "Team Player",
		description: "Great collaboration",
		recipientCount: 8,
		icon: "🤝",
	},
	{
		id: "3",
		name: "Innovation Award",
		description: "Creative solutions",
		recipientCount: 3,
		icon: "💡",
	},
	{
		id: "4",
		name: "Leadership Award",
		description: "Strong leadership",
		recipientCount: 4,
		icon: "👑",
	},
]

export default function RecognitionPage() {
	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Recognition & Rewards
						</h1>
						<p className="text-gray-600 mt-2">
							Recognize and reward employee achievements
						</p>
					</div>
					<Button>Give Recognition</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Total Recognitions</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{mockRecognitions.length}
									</p>
								</div>
								<Star className="w-10 h-10 text-yellow-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Badges Available</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{mockBadges.length}
									</p>
								</div>
								<Trophy className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">This Month</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">2</p>
								</div>
								<TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Recent Recognitions */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Recognitions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockRecognitions.map((recognition) => (
								<div
									key={recognition.id}
									className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div className="flex items-start gap-4">
										<div className="text-3xl">{recognition.badge}</div>
										<div className="flex-1">
											<h3 className="font-semibold text-gray-900">
												{recognition.recipientName}
											</h3>
											<p className="text-sm text-blue-600 mt-1">
												{recognition.awardType}
											</p>
											<p className="text-sm text-gray-600 mt-2">
												{recognition.reason}
											</p>
											<div className="flex justify-between text-xs text-gray-500 mt-3">
												<span>Given by: {recognition.givenBy}</span>
												<span>
													{new Date(recognition.date).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Available Badges */}
				<Card>
					<CardHeader>
						<CardTitle>Available Badges</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{mockBadges.map((badge) => (
								<div
									key={badge.id}
									className="p-4 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow"
								>
									<div className="text-4xl mb-2">{badge.icon}</div>
									<h3 className="font-semibold text-gray-900">{badge.name}</h3>
									<p className="text-sm text-gray-600 mt-2">
										{badge.description}
									</p>
									<p className="text-xs text-gray-500 mt-3">
										{badge.recipientCount} recipients
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</MainLayout>
	)
}
