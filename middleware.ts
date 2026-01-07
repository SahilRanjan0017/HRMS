import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/login']
const protectedRoutes = ['/home', '/attendance', '/leave', '/expenses', '/salary', '/profile']

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// For demo purposes, allow all routes
	// In production, check authentication token here
	// const token = request.cookies.get('authToken')?.value

	// if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
	//   return NextResponse.redirect(new URL('/login', request.url))
	// }

	// if (token && pathname.startsWith('/login')) {
	//   return NextResponse.redirect(new URL('/home', request.url))
	// }

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next|favicon.ico).*)'],
}
