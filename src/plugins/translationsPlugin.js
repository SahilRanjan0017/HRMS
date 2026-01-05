export const translationsPlugin = {
	async isReady() {
		return Promise.resolve()
	},
	install(app) {
		const __ = (txt, replace) => {
			if (!txt) return ''
			if (replace && typeof replace === 'object') {
				return txt.replace(/\{(\w*)\}/g, (match, key) => {
					return replace[key] !== undefined ? replace[key] : match
				})
			}
			return txt
		}
		app.config.globalProperties.__ = __
		app.provide("$translate", __)
	},
}
