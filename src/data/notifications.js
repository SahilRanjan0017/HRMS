import { createResource, createListResource } from "@/utils/frappe-ui"
import { userResource } from "./user"

// Mock notification data for demo
export const unreadNotificationsCount = createResource({
	url: "hrms.api.get_unread_notifications_count",
	cache: "hrms:unread_notifications_count",
	initialData: 5,
	auto: true,
	onError() { console.log('Mocking unread notifications') }
})

export const notifications = createListResource({
	doctype: "PWA Notification",
	filters: { to_user: userResource.data.name },
	fields: [
		"name",
		"from_user",
		"message",
		"read",
		"creation",
		"reference_document_type",
		"reference_document_name",
	],
	auto: false, // Disable auto fetch for list
	cache: "hrms:notifications",
	orderBy: "creation desc",
	initialData: [
		{ name: "NOT-001", message: "Your leave request was approved", read: 0, creation: "2024-05-20" },
		{ name: "NOT-002", message: "New expense claim policy update", read: 1, creation: "2024-05-18" }
	],
	onSuccess() {
		unreadNotificationsCount.reload()
	},
})

export const arePushNotificationsEnabled = createResource({
	url: "hrms.api.are_push_notifications_enabled",
	cache: "hrms:push_notifications_enabled",
	initialData: true,
	auto: true,
	onError() { console.log('Mocking push settings') }
})
