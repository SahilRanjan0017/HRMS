'use client'

import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

// Types
export interface PayrollRun {
	id: string
	org_id: string
	payroll_period_start: string
	payroll_period_end: string
	payroll_month: string
	status: 'draft' | 'in_progress' | 'dry_run' | 'finalized' | 'locked' | 'released'
	total_employees: number
	total_gross_amount: number
	total_deductions: number
	total_net_amount: number
	total_pf_employee: number
	total_pf_employer: number
	total_esi_employee: number
	total_esi_employer: number
	total_pt: number
	total_tds: number
	locked_at?: string
	locked_by?: string
	approved_at?: string
	approved_by?: string
	released_at?: string
	released_by?: string
	created_at: string
	updated_at: string
	created_by?: string
	notes?: string
}

export interface PayrollComponent {
	id: string
	org_id: string
	payroll_run_id: string
	employee_id: string
	salary_structure_id: string
	days_worked: number
	days_absent: number
	days_leave: number
	days_in_month: number
	basic_pay: number
	dearness_allowance: number
	house_rent_allowance: number
	other_allowances: number
	gross_amount: number
	pf_employee: number
	pf_employer: number
	esi_employee: number
	esi_employer: number
	professional_tax: number
	tds: number
	advance_recovery: number
	loan_recovery: number
	other_deductions: number
	total_deductions: number
	net_pay: number
	is_validated: boolean
	validation_errors?: string
	is_locked: boolean
	created_at: string
	updated_at: string
}

export interface Employee {
	id: string
	org_id: string
	employee_id: string
	first_name: string
	last_name: string
	email: string
	date_of_birth?: string
	gender?: string
	date_of_joining: string
	date_of_exit?: string
	employment_status: string
	department?: string
	designation?: string
	phone_number?: string
	bank_account_number?: string
	bank_ifsc_code?: string
	created_at: string
	updated_at: string
}

// Hook for Payroll Operations
export const usePayroll = (orgId?: string) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Get all payroll runs for an organization
	const getPayrollRuns = useCallback(
		async (filters?: { status?: string; month?: string }) => {
			try {
				setLoading(true)
				setError(null)

				let query = supabase.from('payroll_runs').select('*')

				if (orgId) {
					query = query.eq('org_id', orgId)
				}

				if (filters?.status) {
					query = query.eq('status', filters.status)
				}

				if (filters?.month) {
					query = query.eq('payroll_month', filters.month)
				}

				const { data, error: err } = await query.order('payroll_period_start', { ascending: false })

				if (err) throw err

				return data as PayrollRun[]
			} catch (err: any) {
				setError(err.message)
				console.error('Error fetching payroll runs:', err)
				return []
			} finally {
				setLoading(false)
			}
		},
		[orgId]
	)

	// Get single payroll run with components
	const getPayrollRunDetail = useCallback(async (payrollRunId: string) => {
		try {
			setLoading(true)
			setError(null)

			const { data, error: err } = await supabase
				.from('payroll_runs')
				.select(
					`
					*,
					payroll_components:payroll_components(
						id,
						employee_id,
						basic_pay,
						gross_amount,
						pf_employee,
						esi_employee,
						professional_tax,
						tds,
						total_deductions,
						net_pay,
						is_validated,
						is_locked
					)
					`
				)
				.eq('id', payrollRunId)
				.single()

			if (err) throw err

			return data
		} catch (err: any) {
			setError(err.message)
			console.error('Error fetching payroll run detail:', err)
			return null
		} finally {
			setLoading(false)
		}
	}, [])

	// Get payroll components for a payroll run
	const getPayrollComponents = useCallback(
		async (payrollRunId: string, filters?: { employeeId?: string; validationStatus?: boolean }) => {
			try {
				setLoading(true)
				setError(null)

				let query = supabase.from('payroll_components').select('*').eq('payroll_run_id', payrollRunId)

				if (filters?.employeeId) {
					query = query.eq('employee_id', filters.employeeId)
				}

				if (filters?.validationStatus !== undefined) {
					query = query.eq('is_validated', filters.validationStatus)
				}

				const { data, error: err } = await query

				if (err) throw err

				return data as PayrollComponent[]
			} catch (err: any) {
				setError(err.message)
				console.error('Error fetching payroll components:', err)
				return []
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	// Create a new payroll run
	const createPayrollRun = useCallback(
		async (orgId: string, payload: Partial<PayrollRun> & { created_by: string }) => {
			try {
				setLoading(true)
				setError(null)

				const { data, error: err } = await supabase.from('payroll_runs').insert([payload]).select().single()

				if (err) throw err

				return data as PayrollRun
			} catch (err: any) {
				setError(err.message)
				console.error('Error creating payroll run:', err)
				return null
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	// Update payroll run status
	const updatePayrollRunStatus = useCallback(async (payrollRunId: string, status: string, updatedBy: string) => {
		try {
			setLoading(true)
			setError(null)

			const { data, error: err } = await supabase
				.from('payroll_runs')
				.update({ status, updated_at: new Date().toISOString() })
				.eq('id', payrollRunId)
				.select()
				.single()

			if (err) throw err

			// Log the action
			await supabase.from('audit_logs').insert([
				{
					entity_type: 'payroll_run',
					entity_id: payrollRunId,
					action: `status_changed_to_${status}`,
					new_values: { status },
					performed_by: updatedBy,
					performed_at: new Date().toISOString(),
				},
			])

			return data as PayrollRun
		} catch (err: any) {
			setError(err.message)
			console.error('Error updating payroll run status:', err)
			return null
		} finally {
			setLoading(false)
		}
	}, [])

	// Lock payroll run (prevent modifications)
	const lockPayrollRun = useCallback(async (payrollRunId: string, lockedBy: string, reason?: string) => {
		try {
			setLoading(true)
			setError(null)

			const { data: lockData, error: lockErr } = await supabase
				.from('payroll_locks')
				.insert([
					{
						payroll_run_id: payrollRunId,
						locked_by: lockedBy,
						lock_reason: reason || 'Payroll finalized and locked',
						is_active: true,
					},
				])
				.select()
				.single()

			if (lockErr) throw lockErr

			// Update payroll run status to locked
			const { data, error: err } = await supabase
				.from('payroll_runs')
				.update({
					status: 'locked',
					locked_at: new Date().toISOString(),
					locked_by: lockedBy,
					updated_at: new Date().toISOString(),
				})
				.eq('id', payrollRunId)
				.select()
				.single()

			if (err) throw err

			return data as PayrollRun
		} catch (err: any) {
			setError(err.message)
			console.error('Error locking payroll run:', err)
			return null
		} finally {
			setLoading(false)
		}
	}, [])

	// Get employees for payroll
	const getEmployees = useCallback(
		async (orgId: string, filters?: { status?: string; department?: string }) => {
			try {
				setLoading(true)
				setError(null)

				let query = supabase.from('employees').select('*').eq('org_id', orgId)

				if (filters?.status) {
					query = query.eq('employment_status', filters.status)
				}

				if (filters?.department) {
					query = query.eq('department', filters.department)
				}

				const { data, error: err } = await query.order('first_name')

				if (err) throw err

				return data as Employee[]
			} catch (err: any) {
				setError(err.message)
				console.error('Error fetching employees:', err)
				return []
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	// Get statutory rules (for calculations)
	const getStatutoryRules = useCallback(async (ruleType?: string, stateCode?: string) => {
		try {
			setLoading(true)
			setError(null)

			let query = supabase.from('statutory_rules').select('*').eq('is_active', true)

			if (ruleType) {
				query = query.eq('rule_type', ruleType)
			}

			if (stateCode) {
				query = query.or(`state_code.eq.${stateCode},state_code.is.null`)
			}

			const { data, error: err } = await query

			if (err) throw err

			return data
		} catch (err: any) {
			setError(err.message)
			console.error('Error fetching statutory rules:', err)
			return []
		} finally {
			setLoading(false)
		}
	}, [])

	// Create payroll components (bulk)
	const createPayrollComponents = useCallback(
		async (components: Partial<PayrollComponent>[], createdBy: string) => {
			try {
				setLoading(true)
				setError(null)

				const payloadWithMetadata = components.map((comp) => ({
					...comp,
					created_by: createdBy,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				}))

				const { data, error: err } = await supabase.from('payroll_components').insert(payloadWithMetadata).select()

				if (err) throw err

				return data as PayrollComponent[]
			} catch (err: any) {
				setError(err.message)
				console.error('Error creating payroll components:', err)
				return []
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	// Validate payroll component
	const validatePayrollComponent = useCallback(async (componentId: string, validatedBy: string) => {
		try {
			setLoading(true)
			setError(null)

			const { data, error: err } = await supabase
				.from('payroll_components')
				.update({ is_validated: true, updated_at: new Date().toISOString() })
				.eq('id', componentId)
				.select()
				.single()

			if (err) throw err

			return data as PayrollComponent
		} catch (err: any) {
			setError(err.message)
			console.error('Error validating payroll component:', err)
			return null
		} finally {
			setLoading(false)
		}
	}, [])

	return {
		loading,
		error,
		getPayrollRuns,
		getPayrollRunDetail,
		getPayrollComponents,
		createPayrollRun,
		updatePayrollRunStatus,
		lockPayrollRun,
		getEmployees,
		getStatutoryRules,
		createPayrollComponents,
		validatePayrollComponent,
	}
}
