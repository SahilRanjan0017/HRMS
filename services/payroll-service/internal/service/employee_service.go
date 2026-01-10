package service

import (
	"database/sql"

	"payroll-service/internal/models"
	"payroll-service/internal/repository"
)

type EmployeeService struct {
	repo *repository.EmployeeRepository
}

func NewEmployeeService(db *sql.DB) *EmployeeService {
	return &EmployeeService{
		repo: repository.NewEmployeeRepository(db),
	}
}

// GetEmployees fetches all employees for an organization
func (s *EmployeeService) GetEmployees(orgID string, filters map[string]interface{}) ([]models.Employee, error) {
	return s.repo.GetEmployees(orgID, filters)
}

// GetEmployeeByID fetches a single employee
func (s *EmployeeService) GetEmployeeByID(employeeID string) (*models.Employee, error) {
	return s.repo.GetEmployeeByID(employeeID)
}

// GetSalaryStructure fetches salary structure for an employee
func (s *EmployeeService) GetSalaryStructure(employeeID string) (*models.SalaryStructure, error) {
	return s.repo.GetSalaryStructure(employeeID)
}

// GetAttendanceSummary fetches attendance summary for a month
func (s *EmployeeService) GetAttendanceSummary(employeeID, month string) (*models.AttendanceSummary, error) {
	return s.repo.GetAttendanceSummary(employeeID, month)
}

// GetLeaveSummary fetches leave summary for a month
func (s *EmployeeService) GetLeaveSummary(employeeID, month string) (*models.LeaveSummary, error) {
	return s.repo.GetLeaveSummary(employeeID, month)
}
