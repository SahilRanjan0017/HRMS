'use client'

import React from 'react'
import { SidebarLayout } from './SidebarLayout'

interface MainLayoutProps {
	children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return <SidebarLayout>{children}</SidebarLayout>
}
