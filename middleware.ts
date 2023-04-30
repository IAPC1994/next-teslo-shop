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
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if( !session ){
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`;
        url.search = `p=${ requestedPage }`;
        return NextResponse.redirect( url );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/checkout/:path*'
    ],
}