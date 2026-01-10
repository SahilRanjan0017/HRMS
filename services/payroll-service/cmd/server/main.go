package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"payroll-service/internal/database"
	"payroll-service/internal/handler"
	"payroll-service/internal/service"
)

func main() {
	// Load environment variables
	if err := godotenv.Load("../../.env.local"); err != nil {
		log.Println("No .env.local file found, using environment variables")
	}

	// Initialize database connection
	db, err := database.NewConnection()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	log.Println("✓ Database connected successfully")

	// Initialize services
	payrollService := service.NewPayrollService(db)
	employeeService := service.NewEmployeeService(db)

	// Start gRPC server (optional, for Phase 2.5)
	go startGRPCServer(payrollService, employeeService)

	// Start REST API server
	startRESTServer(payrollService, employeeService)
}

func startRESTServer(payrollService *service.PayrollService, employeeService *service.EmployeeService) {
	router := gin.Default()

	// Middleware
	router.Use(corsMiddleware())

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "service": "payroll-service"})
	})

	// Payroll API v1
	v1 := router.Group("/api/v1")
	{
		handler.RegisterPayrollRoutes(v1, payrollService)
		handler.RegisterEmployeeRoutes(v1, employeeService)
	}

	port := os.Getenv("PAYROLL_SERVICE_PORT")
	if port == "" {
		port = "8001"
	}

	log.Printf("Starting Payroll Service on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func startGRPCServer(payrollService *service.PayrollService, employeeService *service.EmployeeService) {
	port := os.Getenv("PAYROLL_SERVICE_GRPC_PORT")
	if port == "" {
		port = "9001"
	}

	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Fatalf("Failed to listen on port %s: %v", port, err)
	}

	log.Printf("Starting gRPC server on port %s", port)

	// TODO: Initialize gRPC server with payroll and employee services
	// For now, just listen
	<-make(chan bool)
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
