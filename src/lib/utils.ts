import { clsx, type ClassValue } from "clsx"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function apiRoute(path: string) {
    return process.env.BASE_API_URI + path
}


export function extractAccessToken(cookieStore: ReadonlyRequestCookies) {
    return `Bearer ${cookieStore.get("accessToken")}`
}

export function getUserId(cookieStore: ReadonlyRequestCookies) {
    return cookieStore.get("userId")
}

