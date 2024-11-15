import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// 1. Specify protected and public routes
const publicRoutes = ["/auth/login", "/auth/signup"]

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    //const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. Decrypt the session from the cookie
    const cookieStore = await cookies()

    const isAuthenticated =
        cookieStore.has("accessToken") && cookieStore.has("userId")

    // 5. Redirect to /login if the user is not authenticated
    if (!isPublicRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
    }

    // 6. Redirect to "/" if the user is authenticated
    if (isPublicRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/test"],
}
