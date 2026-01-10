package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"payroll-service/internal/service"
)

type EmployeeHandler struct {
	service *service.EmployeeService
}

func NewEmployeeHandler(service *service.EmployeeService) *EmployeeHandler {
	return &EmployeeHandler{service: service}
}

// RegisterEmployeeRoutes registers all employee routes
func RegisterEmployeeRoutes(router *gin.RouterGroup, service *service.EmployeeService) {
	handler := NewEmployeeHandler(service)

	employees := router.Group("/employees")
	{
		employees.GET("", handler.GetEmployees)
		employees.GET("/:id", handler.GetEmployeeByID)
		employees.GET("/:id/salary-structure", handler.GetSalaryStructure)
		employees.GET("/:id/attendance/:month", handler.GetAttendanceSummary)
		employees.GET("/:id/leave/:month", handler.GetLeaveSummary)
	}
}

// GetEmployees lists all employees
// @Summary Get employees
// @Param org_id query string true "Organization ID"
// @Param employment_status query string false "Employment status"
// @Param department query string false "Department"
func (h *EmployeeHandler) GetEmployees(c *gin.Context) {
	orgID := c.Query("org_id")
	if orgID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "org_id is required"})
		return
	}

	filters := map[string]interface{}{}
	if status := c.Query("employment_status"); status != "" {
		filters["employment_status"] = status
	}
	if dept := c.Query("department"); dept != "" {
		filters["department"] = dept
	}

	employees, err := h.service.GetEmployees(orgID, filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"count": len(employees),
		"data":  employees,
	})
}

// GetEmployeeByID gets a single employee
func (h *EmployeeHandler) GetEmployeeByID(c *gin.Context) {
	employeeID := c.Param("id")

	employee, err := h.service.GetEmployeeByID(employeeID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, employee)
}

// GetSalaryStructure gets employee salary structure
func (h *EmployeeHandler) GetSalaryStructure(c *gin.Context) {
	employeeID := c.Param("id")

	ss, err := h.service.GetSalaryStructure(employeeID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, ss)
}

// GetAttendanceSummary gets attendance for a month
// @Summary Get attendance summary
// @Param month query string true "Month (YYYY-MM)"
func (h *EmployeeHandler) GetAttendanceSummary(c *gin.Context) {
	employeeID := c.Param("id")
	month := c.Param("month")

	attendance, err := h.service.GetAttendanceSummary(employeeID, month)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if attendance == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No attendance data found"})
		return
	}

	c.JSON(http.StatusOK, attendance)
}

// GetLeaveSummary gets leave for a month
// @Summary Get leave summary
// @Param month query string true "Month (YYYY-MM)"
func (h *EmployeeHandler) GetLeaveSummary(c *gin.Context) {
	employeeID := c.Param("id")
	month := c.Param("month")

	leave, err := h.service.GetLeaveSummary(employeeID, month)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if leave == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No leave data found"})
		return
	}

	c.JSON(http.StatusOK, leave)
}
