import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware( req:NextRequest, ev:NextFetchEvent ) {
    const requestedPage = req.nextUrl.pathname;
    if( requestedPage.startsWith('/checkout') ){
        const token = req.cookies.get('token')?.value || '';
        console.log(token);
        try {
            await jose.jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET_SEED)
            );
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(
                new URL(`/auth/login?p=${ requestedPage }`, req.url)
            );
        }
    }

}

export const config = {
    matcher: [
        '/checkout/:path*'
    ],
}