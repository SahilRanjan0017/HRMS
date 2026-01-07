'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'

interface InfoCardsProps {
	onFeaturesClick?: () => void
}

export const InfoCards: React.FC<InfoCardsProps> = ({ onFeaturesClick }) => {
	const infoCards = [
		{
			id: 'organization',
			title: 'Organization',
			description: 'View org chart & team',
			icon: '🏢',
			color: 'bg-blue-100',
		},
		{
			id: 'handbook',
			title: 'Handbook',
			description: 'Policies & guidelines',
			icon: '📖',
			color: 'bg-yellow-100',
		},
		{
			id: 'tasks',
			title: 'My Tasks',
			description: '5 pending actions',
			icon: '✓',
			color: 'bg-yellow-200',
			badge: '5',
		},
	]

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			{infoCards.map((card) => (
				<Card key={card.id} className="hover:shadow-md transition-shadow cursor-pointer">
					<CardContent>
						<div className="flex items-start gap-4">
							<div className={`${card.color} w-16 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
								{card.icon}
							</div>
							<div className="flex-1">
								<h3 className="font-bold text-gray-900">{card.title}</h3>
								<p className="text-gray-600 text-sm">{card.description}</p>
							</div>
							{card.badge && (
								<div className="flex-shrink-0">
									<span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold">
										{card.badge}
									</span>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
