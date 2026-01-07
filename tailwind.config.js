/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./lib/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Primary Brand Colors
				primary: {
					50: '#EEF2FF',
					100: '#E0E7FF',
					500: '#4F7DFF',
					600: '#3A66E5',
					DEFAULT: '#4F7DFF',
				},
				// Accent Colors
				accent: {
					teal: '#2AC7B8',
				},
				// Semantic Colors
				success: {
					50: '#F0FDF4',
					100: '#DCFCE7',
					500: '#22C55E',
					DEFAULT: '#22C55E',
				},
				warning: {
					50: '#FFFBEB',
					100: '#FEF3C7',
					500: '#F59E0B',
					DEFAULT: '#F59E0B',
				},
				error: {
					50: '#FEF2F2',
					100: '#FEE2E2',
					500: '#EF4444',
					DEFAULT: '#EF4444',
				},
				info: {
					50: '#F5F3FF',
					100: '#EDE9FE',
					500: '#8B5CF6',
					DEFAULT: '#8B5CF6',
				},
				// Neutral Colors (Enterprise Gray Scale)
				neutral: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					500: '#6B7280',
					700: '#374151',
					900: '#111827',
				},
				// Background Colors
				bg: {
					app: '#F6F8FC',
					card: '#FFFFFF',
					sidebar: '#FFFFFF',
				},
				// Text Colors
				text: {
					heading: '#111827',
					primary: '#1F2937',
					secondary: '#6B7280',
					muted: '#9CA3AF',
				},
			},
			fontFamily: {
				sans: ['Inter', 'SF Pro', 'Roboto', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				// Typography Scale
				'heading-xl': ['24px', { lineHeight: '32px', fontWeight: '600' }],
				'heading-l': ['20px', { lineHeight: '28px', fontWeight: '600' }],
				'heading-m': ['16px', { lineHeight: '24px', fontWeight: '600' }],
				'body-l': ['14px', { lineHeight: '20px', fontWeight: '400' }],
				'body-m': ['13px', { lineHeight: '18px', fontWeight: '400' }],
				'label-s': ['12px', { lineHeight: '16px', fontWeight: '500' }],
				'caption': ['11px', { lineHeight: '14px', fontWeight: '400' }],
			},
			spacing: {
				// 8pt Grid System
				'1': '4px',
				'2': '8px',
				'3': '12px',
				'4': '16px',
				'6': '24px',
				'8': '32px',
				'10': '40px',
				'12': '48px',
			},
			borderRadius: {
				'xs': '6px',
				's': '8px',
				'm': '12px',
				'l': '16px',
				'card': '12px',
				'button': '8px',
			},
			boxShadow: {
				'card': '0px 6px 20px rgba(17, 24, 39, 0.06)',
				'dropdown': '0px 8px 24px rgba(17, 24, 39, 0.08)',
				'enterprise': '0 1px 2px rgba(0, 0, 0, 0.04)',
			},
			height: {
				'topbar': '64px',
				'sidebar': '72px',
				'button': '40px',
				'input': '40px',
			},
			width: {
				'sidebar': '72px',
			},
		},
	},
	plugins: [],
}
