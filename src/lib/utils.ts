import { clsx, type ClassValue } from "clsx"
import { io } from "socket.io-client"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function apiRoute(path: string) {
    return process.env.NEXT_PUBLIC_BASE_API_URI + path
}

export async function fetcher(path: string) {
    const res = await axios(path, {
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URI,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.data
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

export const socketUrl =
    process.env.NEXT_PUBLIC_SOCKET_URI

export const socket = io(socketUrl, {
    autoConnect: false,
})
