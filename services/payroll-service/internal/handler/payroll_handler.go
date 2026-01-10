package handler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"payroll-service/internal/service"
)

type PayrollHandler struct {
	service *service.PayrollService
}

func NewPayrollHandler(service *service.PayrollService) *PayrollHandler {
	return &PayrollHandler{service: service}
}

// RegisterPayrollRoutes registers all payroll routes
func RegisterPayrollRoutes(router *gin.RouterGroup, service *service.PayrollService) {
	handler := NewPayrollHandler(service)

	payroll := router.Group("/payroll")
	{
		payroll.GET("/runs", handler.GetPayrollRuns)
		payroll.POST("/runs", handler.CreatePayrollRun)
		payroll.GET("/runs/:id", handler.GetPayrollRunDetail)
		payroll.POST("/runs/:id/initiate", handler.InitiatePayrollRun)
		payroll.POST("/runs/:id/validate", handler.ValidatePayroll)
		payroll.POST("/runs/:id/finalize", handler.FinalizePayroll)
		payroll.POST("/runs/:id/approve", handler.ApprovePayroll)
		payroll.POST("/runs/:id/release", handler.ReleasePayroll)
		payroll.POST("/runs/:id/dry-run", handler.DryRunPayroll)
		payroll.GET("/runs/:id/summary", handler.GetPayrollSummary)
	}
}

// GetPayrollRuns lists all payroll runs for an organization
// @Summary Get payroll runs
// @Param org_id query string true "Organization ID"
// @Param status query string false "Payroll status"
// @Param month query string false "Payroll month (YYYY-MM)"
func (h *PayrollHandler) GetPayrollRuns(c *gin.Context) {
	orgID := c.Query("org_id")
	if orgID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "org_id is required"})
		return
	}

	filters := map[string]interface{}{}
	if status := c.Query("status"); status != "" {
		filters["status"] = status
	}
	if month := c.Query("month"); month != "" {
		filters["month"] = month
	}

	runs, err := h.service.GetPayrollRuns(orgID, filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"count": len(runs),
		"data":  runs,
	})
}

// CreatePayrollRun creates a new payroll cycle
// @Summary Create payroll run
// @Param request body CreatePayrollRunRequest true "Payroll run details"
func (h *PayrollHandler) CreatePayrollRun(c *gin.Context) {
	var req struct {
		OrgID     string `json:"org_id" binding:"required"`
		StartDate string `json:"start_date" binding:"required"` // YYYY-MM-DD
		EndDate   string `json:"end_date" binding:"required"`   // YYYY-MM-DD
		CreatedBy string `json:"created_by" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	startDate, err := time.Parse("2006-01-02", req.StartDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start_date format (use YYYY-MM-DD)"})
		return
	}

	endDate, err := time.Parse("2006-01-02", req.EndDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end_date format (use YYYY-MM-DD)"})
		return
	}

	pr, err := h.service.CreatePayrollRun(req.OrgID, startDate, endDate, req.CreatedBy)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, pr)
}

// GetPayrollRunDetail gets payroll run with all components
func (h *PayrollHandler) GetPayrollRunDetail(c *gin.Context) {
	payrollRunID := c.Param("id")

	detail, err := h.service.GetPayrollRunDetail(payrollRunID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, detail)
}

// InitiatePayrollRun initializes payroll components for all employees
func (h *PayrollHandler) InitiatePayrollRun(c *gin.Context) {
	payrollRunID := c.Param("id")

	var req struct {
		OrgID       string `json:"org_id" binding:"required"`
		StateCode   string `json:"state_code"` // Optional, defaults to MH
		InitiatedBy string `json:"initiated_by" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.StateCode == "" {
		req.StateCode = "MH" // Default to Maharashtra
	}

	if err := h.service.InitiatePayrollRun(req.OrgID, payrollRunID, req.StateCode, req.InitiatedBy); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Payroll initiated successfully",
		"payroll_run_id": payrollRunID,
	})
}

// ValidatePayroll validates payroll components
func (h *PayrollHandler) ValidatePayroll(c *gin.Context) {
	payrollRunID := c.Param("id")

	errors, err := h.service.ValidatePayroll(payrollRunID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"valid":        len(errors) == 0,
		"error_count":  len(errors),
		"errors":       errors,
	})
}

// FinalizePayroll finalizes a payroll run
func (h *PayrollHandler) FinalizePayroll(c *gin.Context) {
	payrollRunID := c.Param("id")

	var req struct {
		FinalizedBy string `json:"finalized_by" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.FinalizePayroll(payrollRunID, req.FinalizedBy); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payroll finalized successfully"})
}

// ApprovePayroll approves a payroll run
func (h *PayrollHandler) ApprovePayroll(c *gin.Context) {
	payrollRunID := c.Param("id")

	var req struct {
		ApprovedBy string `json:"approved_by" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.ApprovePayroll(payrollRunID, req.ApprovedBy); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payroll approved and locked successfully"})
}

// ReleasePayroll releases a payroll run
func (h *PayrollHandler) ReleasePayroll(c *gin.Context) {
	payrollRunID := c.Param("id")

	var req struct {
		ReleasedBy string `json:"released_by" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.ReleasePayroll(payrollRunID, req.ReleasedBy); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payroll released successfully"})
}

// DryRunPayroll performs a dry run
func (h *PayrollHandler) DryRunPayroll(c *gin.Context) {
	payrollRunID := c.Param("id")

	if err := h.service.DryRunPayroll(payrollRunID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payroll dry run completed successfully"})
}

// GetPayrollSummary gets financial summary
func (h *PayrollHandler) GetPayrollSummary(c *gin.Context) {
	payrollRunID := c.Param("id")

	summary, err := h.service.GetPayrollSummary(payrollRunID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, summary)
}
