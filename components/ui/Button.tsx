import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'solid' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	loading?: boolean
	children?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = 'solid', size = 'md', loading = false, className = '', disabled, ...props }, ref) => {
		const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

		const variantStyles = {
			solid: 'bg-blue-600 text-white hover:bg-blue-700',
			outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
			ghost: 'text-gray-700 hover:bg-gray-100',
		}

		const sizeStyles = {
			sm: 'px-3 py-1.5 text-sm',
			md: 'px-4 py-2 text-base',
			lg: 'px-6 py-3 text-lg',
		}

		return (
			<button
				ref={ref}
				disabled={loading || disabled}
				className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
				{...props}
			>
				{loading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
				{props.children}
			</button>
		)
	}
)

Button.displayName = 'Button'
