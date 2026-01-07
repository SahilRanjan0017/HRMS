'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseResourceOptions {
	url?: string
	initialData?: any
	auto?: boolean
	onSuccess?: (data: any) => void
	onError?: (error: Error) => void
}

interface UseResourceReturn {
	data: any
	loading: boolean
	error: Error | null
	fetch: () => Promise<any>
	reload: () => Promise<any>
	submit: (params: any) => Promise<any>
	reset: () => void
}

const MOCK_DELAY = 300

export const useResource = (options: UseResourceOptions): UseResourceReturn => {
	const [data, setData] = useState(options.initialData || null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const fetch = useCallback(async () => {
		setLoading(true)
		setError(null)

		try {
			await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY))

			if (options.onSuccess) {
				options.onSuccess(data)
			}
			return data
		} catch (err) {
			const error = err instanceof Error ? err : new Error(String(err))
			setError(error)
			if (options.onError) {
				options.onError(error)
			}
			throw error
		} finally {
			setLoading(false)
		}
	}, [data, options])

	const submit = useCallback(
		async (params: any) => {
			setLoading(true)
			setError(null)

			try {
				await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY))
				const newData = { ...data, ...params }
				setData(newData)

				if (options.onSuccess) {
					options.onSuccess(newData)
				}
				return newData
			} catch (err) {
				const error = err instanceof Error ? err : new Error(String(err))
				setError(error)
				if (options.onError) {
					options.onError(error)
				}
				throw error
			} finally {
				setLoading(false)
			}
		},
		[data, options]
	)

	const reload = useCallback(() => fetch(), [fetch])

	const reset = useCallback(() => {
		setData(options.initialData || null)
	}, [options.initialData])

	useEffect(() => {
		if (options.auto) {
			fetch()
		}
	}, [])

	return {
		data,
		loading,
		error,
		fetch,
		reload,
		submit,
		reset,
	}
}
