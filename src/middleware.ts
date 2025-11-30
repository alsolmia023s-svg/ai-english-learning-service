import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');
    const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');

    if (isOnDashboard || isOnAdmin) {
        if (isLoggedIn) return NextResponse.next();
        return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
