// API layer for Next.js
// This replaces the Vue.js composables and frappe-ui utilities

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
const MOCK_DELAY = 300

// Toast notification system
type NotificationCallback = (notification: any) => void
const notificationListeners: NotificationCallback[] = []

export const toast = (options: string | { message?: string; type?: string; duration?: number }) => {
	const notification = {
		id: Date.now(),
		message: typeof options === 'string' ? options : options.message || '',
		type: typeof options === 'string' ? 'info' : options.type || 'info',
		duration: typeof options === 'string' ? 3000 : options.duration || 3000,
	}

	notificationListeners.forEach((listener) => listener(notification))

	if (notification.duration) {
		setTimeout(() => {
			notificationListeners.forEach((listener) => listener({ ...notification, id: null }))
		}, notification.duration)
	}

	return notification
}

export const onNotification = (callback: NotificationCallback) => {
	notificationListeners.push(callback)
	return () => {
		notificationListeners.splice(notificationListeners.indexOf(callback), 1)
	}
}

// HTTP request handler
interface RequestOptions {
	method?: string
	url: string
	data?: any
	headers?: Record<string, string>
}

export const request = async (options: RequestOptions) => {
	const { method = 'GET', url, data, headers = {} } = options

	try {
		// Simulate network latency
		await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY))

		const response = await fetch(`${API_BASE_URL}${url}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: data ? JSON.stringify(data) : undefined,
		})

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		return await response.json()
	} catch (error) {
		console.error('[Request Error]', error)
		throw error
	}
}

// RPC call handler
export const call = async (method: string, params: Record<string, any> = {}) => {
	console.log(`[RPC Call] ${method}`, params)

	try {
		await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY))

		if (method === 'login') {
			return { message: 'Logged In', success: true }
		}

		return { message: 'Success', success: true }
	} catch (error) {
		console.error(`[RPC Error] ${method}:`, error)
		throw error
	}
}

// Utility function for currency formatting
export const convertToCurrency = (value: number, currency = 'USD') => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
	}).format(value || 0)
}

// Config setter
export const setConfig = (key: string, value: any) => {
	console.log(`[Config] ${key} = ${value}`)
}
