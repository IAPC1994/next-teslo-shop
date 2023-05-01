// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import * as jose from "jose";

// export async function middleware( req:NextRequest, ev:NextFetchEvent ) {
//     const requestedPage = req.nextUrl.pathname;
//     if( requestedPage.startsWith('/checkout') ){
//         const token = req.cookies.get('token')?.value || '';
        
//         try {
//             await jose.jwtVerify(
//                 token,
//                 new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
//             );
//             return NextResponse.next();
//         } catch (error) {
//             return NextResponse.redirect(
//                 new URL(`/auth/login?p=${ requestedPage }`, req.url)
//             );
//         }
//     }

// }

// export const config = {
//     matcher: [
//         '/checkout/:path*'
//     ],
// }

import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware( req:NextRequest, ev:NextFetchEvent ) {
    
    const requestedPage = req.nextUrl.pathname;
    const validRoles = ['admin','super-user','SEO'];
    const session:any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if( !session ){
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`;
        url.search = `p=${ requestedPage }`;
        
        if(requestedPage.startsWith('/api/admin')){
            return NextResponse.json({ error: 'Unauthorized' },{ status: 401 });
        }

        return NextResponse.redirect( url );
    }
    
    if(requestedPage.startsWith('/admin') && !validRoles.includes(session.user.role)){
        return NextResponse.redirect(new URL('/', req.url ));
    }

    if ( requestedPage.startsWith("/api/admin") && !validRoles.includes(session.user.role)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/checkout/:path*',
        '/orders/:path*',
        '/api/orders/:path*',
        '/api/admin/:path*',
        '/admin/:path*',
    ],
}