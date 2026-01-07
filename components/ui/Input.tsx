import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ label, error, helperText, className = '', ...props }, ref) => {
		return (
			<div className="flex flex-col gap-1.5">
				{label && (
					<label className="block text-sm font-medium text-gray-700">
						{label}
						{props.required && <span className="text-red-600 ml-1">*</span>}
					</label>
				)}
				<input
					ref={ref}
					className={`px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
						error ? 'border-red-600 focus:ring-red-600' : 'border-gray-300'
					} ${className}`}
					{...props}
				/>
				{error && <p className="text-sm text-red-600">{error}</p>}
				{helperText && <p className="text-sm text-gray-500">{helperText}</p>}
			</div>
		)
	}
)

Input.displayName = 'Input'
