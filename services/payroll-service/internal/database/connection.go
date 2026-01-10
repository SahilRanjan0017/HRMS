package database

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/lib/pq"
)

// NewConnection creates and returns a new database connection to Supabase PostgreSQL
func NewConnection() (*sql.DB, error) {
	// Supabase connection string format:
	// postgresql://[user]:[password]@[host]:[port]/[database]
	// We can use the SUPABASE_URL and construct the connection string

	supabaseURL := os.Getenv("NEXT_PUBLIC_SUPABASE_URL")
	supabaseAnonKey := os.Getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

	// For direct database access, use service role key (more powerful than anon key)
	dbUser := os.Getenv("DATABASE_USER")
	dbPassword := os.Getenv("DATABASE_PASSWORD")
	dbHost := os.Getenv("DATABASE_HOST")
	dbPort := os.Getenv("DATABASE_PORT")
	dbName := os.Getenv("DATABASE_NAME")

	// Fallback: construct from Supabase URL
	if dbHost == "" && supabaseURL != "" {
		// Extract host from URL (e.g., https://bfeuvqucqxiuhpkvgwgr.supabase.co)
		// Supabase provides POSTGRES_PASSWORD in project settings
		dbHost = "db.bfeuvqucqxiuhpkvgwgr.supabase.co" // Replace with your actual Supabase host
		dbPort = "5432"
		dbName = "postgres"
		dbUser = "postgres"
		dbPassword = os.Getenv("DATABASE_PASSWORD") // Set via environment
	}

	if dbHost == "" || dbPassword == "" {
		return nil, fmt.Errorf("database credentials not set in environment variables")
	}

	// Construct connection string
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=require",
		dbHost, dbPort, dbUser, dbPassword, dbName,
	)

	// Open connection
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Configure connection pool
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	// Test connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return db, nil
}
