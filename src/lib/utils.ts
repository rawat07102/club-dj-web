import { clsx, type ClassValue } from "clsx"
import { io } from "socket.io-client"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function apiRoute(path: string) {
    return process.env.BASE_API_URI + path
}

export function extractAccessToken(cookieStore: ReadonlyRequestCookies) {
    if (!cookieStore.has("accessToken")) {
        throw new Error("cookieStore does not have 'accessToken'")
    }
    return `Bearer ${cookieStore.get("accessToken")?.value}`
}

export function getUserId(cookieStore: ReadonlyRequestCookies) {
    if (!cookieStore.has("userId")) {
        throw new Error("cookieStore does not have 'userId'")
    }
    return cookieStore.get("userId")?.value
}

export function getYoutubeVideoSrc(ids: string[]) {
    let src = `https://www.youtube.com/embed/${ids[0]}?&autoplay=1&controls=1&disablekb=0&iv_load_policy=3`
    if (ids.length > 1) {
        src = src + `&playlist=${ids.slice(1).join(",")}`
    }
    return src
}

export const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:4000"

export const socket = io(socketUrl, {
    autoConnect: false,
})
