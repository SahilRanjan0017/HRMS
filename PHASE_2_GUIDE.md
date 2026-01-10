# Phase 2: Go Microservices Architecture - IMPLEMENTATION GUIDE

## Overview

Phase 2 builds the backend microservices for payroll processing. We're starting with the **payroll-service** microservice written in Go.

## Project Structure

```
services/
├── payroll-service/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go                 (Entry point)
│   ├── internal/
│   │   ├── database/
│   │   │   └── connection.go           (PostgreSQL connection)
│   │   ├── models/
│   │   │   └── models.go               (Domain models)
│   │   ├── repository/
│   │   │   ├── payroll_repository.go   (Data access layer)
│   │   │   └── employee_repository.go
│   │   ├── service/
│   │   │   ├── payroll_service.go      (Business logic)
│   │   │   └── employee_service.go
│   │   └── handler/
│   │       ├── payroll_handler.go      (REST API endpoints)
│   │       └── employee_handler.go
│   ├── go.mod
│   ├── Dockerfile
│   └── README.md
```

## Architecture Layers

### 1. **Handler Layer** (REST API)
- HTTP endpoints using Gin framework
- Request validation
- Response formatting

### 2. **Service Layer** (Business Logic)
- Payroll calculation logic
- Validation rules
- Workflow orchestration

### 3. **Repository Layer** (Data Access)
- Database queries
- CRUD operations
- Transaction handling

### 4. **Database Layer**
- PostgreSQL connection (via Supabase)
- Connection pooling
- Error handling

### 5. **Models Layer** (Domain Objects)
- Go structs matching database schema
- Type safety
- Field validation

## REST API Endpoints

### Payroll Endpoints

```
GET    /api/v1/payroll/runs              - List payroll runs
POST   /api/v1/payroll/runs              - Create new payroll run
GET    /api/v1/payroll/runs/:id          - Get payroll details
POST   /api/v1/payroll/runs/:id/initiate - Initiate payroll (create components)
POST   /api/v1/payroll/runs/:id/validate - Validate payroll
POST   /api/v1/payroll/runs/:id/finalize - Finalize payroll
POST   /api/v1/payroll/runs/:id/approve  - Approve & lock payroll
POST   /api/v1/payroll/runs/:id/release  - Release for payment
POST   /api/v1/payroll/runs/:id/dry-run  - Perform dry run
GET    /api/v1/payroll/runs/:id/summary  - Get financial summary
```

### Employee Endpoints

```
GET    /api/v1/employees                 - List employees
GET    /api/v1/employees/:id             - Get employee details
GET    /api/v1/employees/:id/salary-structure - Get salary structure
GET    /api/v1/employees/:id/attendance/:month - Get attendance summary
GET    /api/v1/employees/:id/leave/:month     - Get leave summary
```

## Setup & Run Instructions

### Prerequisites

- Go 1.21+
- PostgreSQL 14+ (or Supabase)
- Docker (optional)

### 1. Configure Environment Variables

Create `.env.local` in the project root (already created in Phase 1):

```env
NEXT_PUBLIC_SUPABASE_URL=https://bfeuvqucqxiuhpkvgwgr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# For Go service
DATABASE_USER=postgres
DATABASE_PASSWORD=your_supabase_password
DATABASE_HOST=db.bfeuvqucqxiuhpkvgwgr.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres

PAYROLL_SERVICE_PORT=8001
PAYROLL_SERVICE_GRPC_PORT=9001
```

### 2. Install Dependencies

```bash
cd services/payroll-service
go mod download
```

### 3. Run the Service

**Locally:**
```bash
cd services/payroll-service
go run cmd/server/main.go
```

**With Docker:**
```bash
docker build -t payroll-service .
docker run -p 8001:8001 -p 9001:9001 --env-file ../../.env.local payroll-service
```

### 4. Test the API

```bash
# Create payroll run
curl -X POST http://localhost:8001/api/v1/payroll/runs \
  -H "Content-Type: application/json" \
  -d '{
    "org_id": "test-org-id",
    "start_date": "2024-01-01",
    "end_date": "2024-01-31",
    "created_by": "admin"
  }'

# Get payroll runs
curl http://localhost:8001/api/v1/payroll/runs?org_id=test-org-id

# Get employees
curl http://localhost:8001/api/v1/employees?org_id=test-org-id
```

## Payroll Workflow

```
1. CREATE PAYROLL RUN (status: draft)
   ↓
2. INITIATE PAYROLL (status: in_progress)
   - Create payroll components for all employees
   - Pro-rate salary based on attendance/leave
   ↓
3. VALIDATE PAYROLL
   - Check for errors/inconsistencies
   ↓
4. FINALIZE PAYROLL (status: finalized)
   - Lock the payroll for approval
   ↓
5. APPROVE PAYROLL (status: locked)
   - Create immutable lock record
   - Prevent post-approval modifications
   ↓
6. RELEASE PAYROLL (status: released)
   - Ready for bank file generation
   - Proceed to payment processing
```

## Key Features Implemented

✅ **Multi-tenant** - Org-based data isolation  
✅ **Deterministic** - Same input → Same output  
✅ **Idempotent** - Safe to retry operations  
✅ **Auditable** - All changes logged  
✅ **Transactional** - Database transactions for data consistency  

## Next Steps: Phase 3

Phase 3 will implement:

1. **Payroll Computation Engine**
   - Rules-based calculation
   - India statutory deductions

2. **Statutory Calculations**
   - PF (Provident Fund): 12% + 12%
   - ESI (Employee State Insurance): 0.75% + 3.25%
   - PT (Professional Tax): State-wise slabs
   - TDS (Tax Deducted at Source): Progressive rates
   - Gratuity: 15 days per year

3. **Validation & Dry-Run**
   - Negative amount checks
   - Salary ceiling validations
   - Employee eligibility checks

4. **Report Generation**
   - Payslips
   - Form 16
   - Form 24Q
   - PF ECR
   - ESI Challan

## Database Connection

The Go service connects to your Supabase PostgreSQL database directly.

**Connection String Format:**
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

**Supabase Details:**
- Host: `db.bfeuvqucqxiuhpkvgwgr.supabase.co`
- Port: `5432`
- Database: `postgres`
- User: `postgres`
- Password: From Supabase project settings

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message here"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Testing

Run unit tests:
```bash
go test ./...
```

Run with coverage:
```bash
go test -cover ./...
```

## Deployment

### Docker Compose (Local)

```yaml
version: '3.8'
services:
  payroll-service:
    build: ./services/payroll-service
    ports:
      - "8001:8001"
      - "9001:9001"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - DATABASE_PASSWORD=${DATABASE_PASSWORD}
      - PAYROLL_SERVICE_PORT=8001
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: payroll
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payroll-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payroll-service
  template:
    metadata:
      labels:
        app: payroll-service
    spec:
      containers:
      - name: payroll-service
        image: payroll-service:latest
        ports:
        - containerPort: 8001
        - containerPort: 9001
        env:
        - name: PAYROLL_SERVICE_PORT
          value: "8001"
        livenessProbe:
          httpGet:
            path: /health
            port: 8001
          initialDelaySeconds: 10
          periodSeconds: 10
```

## Performance Considerations

1. **Database Indexes** - Created on org_id, status, dates for quick queries
2. **Connection Pooling** - Max 25 open connections, 5 idle
3. **Caching** - Statutory rules cached (can be added in Phase 3)
4. **Pagination** - Can be added for large employee lists
5. **Batch Operations** - Payroll components created efficiently

## Security

1. **TLS** - Enable in production
2. **Authentication** - To be implemented in Phase 2.5
3. **Authorization** - RBAC middleware needed
4. **Input Validation** - All endpoints validate input
5. **SQL Injection** - Protected via parameterized queries
6. **Encryption** - PAN, Aadhaar to be encrypted at database level

## Troubleshooting

### Database Connection Error

Check environment variables:
```bash
echo $NEXT_PUBLIC_SUPABASE_URL
echo $DATABASE_PASSWORD
```

Verify Supabase is running and credentials are correct.

### Port Already in Use

Change port in environment:
```bash
export PAYROLL_SERVICE_PORT=8002
```

### Query Timeout

Increase DB connection timeout in `internal/database/connection.go`

## Contributing

1. Follow Go code conventions
2. Add tests for new features
3. Update documentation
4. Submit pull request

---

**Phase 2 Status: READY FOR USE** ✅

Next: Phase 3 (Payroll Calculation Engine)
