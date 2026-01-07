import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
	className?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className = '', ...props }, ref) => (
		<div
			ref={ref}
			className={`rounded-lg border border-gray-200 bg-white p-6 shadow-card ${className}`}
			{...props}
		/>
	)
)

Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
	({ className = '', ...props }, ref) => (
		<div ref={ref} className={`mb-4 border-b pb-4 ${className}`} {...props} />
	)
)

CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className = '', ...props }, ref) => (
		<h2 ref={ref} className={`text-lg font-bold text-gray-900 ${className}`} {...props} />
	)
)

CardTitle.displayName = 'CardTitle'

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
	({ className = '', ...props }, ref) => (
		<div ref={ref} className={`${className}`} {...props} />
	)
)

CardContent.displayName = 'CardContent'
