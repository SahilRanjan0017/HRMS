'use client'

import { useState, useEffect, useCallback } from 'react'

export const useTheme = () => {
	const [isDark, setIsDark] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const saved = localStorage.getItem('theme')
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		const dark = saved === 'dark' || (!saved && prefersDark)
		setIsDark(dark)
		updateTheme(dark)
	}, [])

	const updateTheme = useCallback((dark: boolean) => {
		if (dark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [])

	const toggleTheme = useCallback(() => {
		setIsDark((prev) => {
			const newState = !prev
			localStorage.setItem('theme', newState ? 'dark' : 'light')
			updateTheme(newState)
			return newState
		})
	}, [updateTheme])

	return {
		isDark: mounted ? isDark : false,
		toggleTheme,
		mounted,
	}
}
