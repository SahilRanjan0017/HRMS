export function initSocket() {
	// Mock socket object for standalone mode
	console.log("[Standalone] Socket initialization bypassed.")
	return {
		on: (event, callback) => {
			// console.log(`[Socket] Listener added for: ${event}`)
		},
		emit: (event, data) => {
			console.log(`[Socket] Emitting: ${event}`, data)
		},
		off: (event) => { }
	}
}
