export const isChrome = () =>
	navigator.userAgent.toLowerCase().includes("chrome")

export const showNotification = (payload) => {
	console.log('[MockNotification]', payload)
}
