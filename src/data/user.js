import router from "@/router"
import { createResource } from "@/utils/frappe-ui"

export const userResource = createResource({
	url: "hrms.api.get_current_user_info",
	cache: "hrms:user",
	initialData: {
		name: "Administrator",
		full_name: "Sahil Ranjan",
		first_name: "Sahil",
		user_image: "https://github.com/shadcn.png"
	},
	onError(error) {
		console.log("User resource error bypassed for demo")
	},
})
