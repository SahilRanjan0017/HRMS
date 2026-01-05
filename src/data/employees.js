import { createResource } from "@/utils/frappe-ui"
import { reactive } from "vue"
import { employeeResource } from "./employee"

let employeesByID = reactive({})
let employeesByUserID = reactive({})

export const employees = createResource({
	url: "hrms.api.get_all_employees",
	auto: true,
	initialData: [
		{ name: "HR-EMP-0001", employee_name: "Sahil Ranjan", status: "Active", user_id: "Administrator", image: "https://github.com/shadcn.png" },
		{ name: "HR-EMP-0002", employee_name: "Jane Smith", status: "Active", user_id: "jane@example.com" },
		{ name: "HR-EMP-0003", employee_name: "John Doe", status: "On Leave", user_id: "john@example.com" }
	],
	transform(data) {
		return data.map((employee) => {
			employee.isActive = employee.status === "Active"
			employeesByID[employee.name] = employee
			employeesByUserID[employee.user_id] = employee

			return employee
		})
	},
	onError(error) {
		console.log("Mocking employees list")
	},
})

export function getEmployeeInfo(employeeID) {
	if (!employeeID) employeeID = employeeResource.data.name

	return employeesByID[employeeID]
}

export function getEmployeeInfoByUserID(userID) {
	return employeesByUserID[userID]
}
