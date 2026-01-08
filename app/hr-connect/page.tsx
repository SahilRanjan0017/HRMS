"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { MessageCircle, Users, Send, Bell } from "lucide-react"

interface Message {
	id: string
	sender: string
	content: string
	timestamp: string
	type: "announcement" | "message" | "notification"
	read: boolean
}

interface Channel {
	id: string
	name: string
	memberCount: number
	unreadCount: number
	lastMessage: string
	lastMessageTime: string
}

const mockMessages: Message[] = [
	{
		id: "1",
		sender: "HR Team",
		content:
			"New office closure announcement: All offices will be closed on Jan 26, 2024 for Republic Day",
		timestamp: "2024-01-08 14:30",
		type: "announcement",
		read: false,
	},
	{
		id: "2",
		sender: "CEO",
		content:
			"Q1 Planning meeting scheduled for next Monday at 10 AM. Please save the date!",
		timestamp: "2024-01-08 12:15",
		type: "announcement",
		read: false,
	},
	{
		id: "3",
		sender: "Engineering Lead",
		content: "Great work on the sprint completion, team!",
		timestamp: "2024-01-08 11:00",
		type: "message",
		read: true,
	},
	{
		id: "4",
		sender: "System",
		content: "Your leave request has been approved for Jan 15-17",
		timestamp: "2024-01-07 16:45",
		type: "notification",
		read: true,
	},
]

const mockChannels: Channel[] = [
	{
		id: "1",
		name: "General",
		memberCount: 45,
		unreadCount: 3,
		lastMessage: "New office closure announcement...",
		lastMessageTime: "2024-01-08 14:30",
	},
	{
		id: "2",
		name: "Announcements",
		memberCount: 45,
		unreadCount: 2,
		lastMessage: "Q1 Planning meeting scheduled...",
		lastMessageTime: "2024-01-08 12:15",
	},
	{
		id: "3",
		name: "Engineering",
		memberCount: 15,
		unreadCount: 0,
		lastMessage: "Great work on the sprint completion...",
		lastMessageTime: "2024-01-08 11:00",
	},
	{
		id: "4",
		name: "Product",
		memberCount: 8,
		unreadCount: 1,
		lastMessage: "Roadmap update for Q1",
		lastMessageTime: "2024-01-07 15:30",
	},
	{
		id: "5",
		name: "Random",
		memberCount: 45,
		unreadCount: 0,
		lastMessage: "Coffee break anyone?",
		lastMessageTime: "2024-01-07 14:00",
	},
]

export default function HRConnectPage() {
	const [selectedChannel, setSelectedChannel] = useState<string>("1")
	const [newMessage, setNewMessage] = useState("")
	const unreadCount = mockMessages.filter((m) => !m.read).length

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							HR Connect
						</h1>
						<p className="text-gray-600 mt-2">
							Company-wide communication and announcements
						</p>
					</div>
					{unreadCount > 0 && (
						<div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full">
							<Bell className="w-4 h-4" />
							<span className="font-semibold">{unreadCount} unread</span>
						</div>
					)}
				</div>

				{/* Main Chat Area */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-96">
					{/* Channels List */}
					<Card className="lg:col-span-1">
						<CardHeader>
							<CardTitle className="text-lg">Channels</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							{mockChannels.map((channel) => (
								<button
									key={channel.id}
									onClick={() => setSelectedChannel(channel.id)}
									className={`w-full text-left p-3 rounded-lg transition-colors ${
										selectedChannel === channel.id
											? "bg-blue-100 text-blue-900"
											: "hover:bg-gray-100"
									}`}
								>
									<div className="flex items-center justify-between">
										<span className="font-medium">#{channel.name}</span>
										{channel.unreadCount > 0 && (
											<span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
												{channel.unreadCount}
											</span>
										)}
									</div>
									<p className="text-xs text-gray-600 mt-1">
										{channel.memberCount} members
									</p>
								</button>
							))}
						</CardContent>
					</Card>

					{/* Messages Area */}
					<Card className="lg:col-span-3">
						<CardHeader>
							<CardTitle>
								#{mockChannels.find((c) => c.id === selectedChannel)?.name}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 max-h-96 overflow-y-auto">
							{mockMessages.map((message) => (
								<div
									key={message.id}
									className={`p-4 rounded-lg border ${
										message.type === "announcement"
											? "bg-blue-50 border-blue-200"
											: message.type === "notification"
												? "bg-green-50 border-green-200"
												: "bg-gray-50 border-gray-200"
									}`}
								>
									<div className="flex items-start justify-between">
										<div>
											<h4 className="font-semibold text-gray-900">
												{message.sender}
											</h4>
											<p className="text-sm text-gray-700 mt-2">
												{message.content}
											</p>
										</div>
										{!message.read && (
											<div className="w-3 h-3 bg-red-500 rounded-full mt-1 ml-2"></div>
										)}
									</div>
									<p className="text-xs text-gray-500 mt-2">
										{message.timestamp}
									</p>
								</div>
							))}
						</CardContent>

						{/* Message Input */}
						<div className="border-t border-gray-200 p-4">
							<div className="flex gap-2">
								<Input
									type="text"
									placeholder="Type a message..."
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									className="flex-1"
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											setNewMessage("")
										}
									}}
								/>
								<Button
									onClick={() => setNewMessage("")}
									className="px-4"
								>
									<Send className="w-4 h-4" />
								</Button>
							</div>
						</div>
					</Card>
				</div>

				{/* Recent Activity */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Announcements</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockMessages
								.filter((m) => m.type === "announcement")
								.map((message) => (
									<div
										key={message.id}
										className="p-4 border border-blue-200 bg-blue-50 rounded-lg"
									>
										<div className="flex items-start justify-between">
											<div>
												<h3 className="font-semibold text-gray-900">
													{message.sender}
												</h3>
												<p className="text-sm text-gray-700 mt-2">
													{message.content}
												</p>
											</div>
											{!message.read && (
												<span className="text-xs font-semibold px-2 py-1 bg-red-200 text-red-800 rounded">
													NEW
												</span>
											)}
										</div>
										<p className="text-xs text-gray-600 mt-3">
											{message.timestamp}
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
