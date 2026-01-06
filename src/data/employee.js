import router from "@/router"
import { createResource } from "@/utils/api"

export const employeeResource = createResource({
	url: "hrms.api.get_current_employee_info",
	cache: "hrms:employee",
	initialData: {
		name: "MEG-EMP-001",
		employee_name: "Sahil Ranjan",
		user_id: "Administrator",
		company: "HRMS",
		date_of_joining: "2024-01-01",
		department: "Management",
		designation: "Product Lead"
	},
	onError(error) {
		console.log("Employee resource error bypassed for demo")
	},
})
