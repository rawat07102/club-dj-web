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
            "Content-Type": "application/json",
        },
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
        return null
    }
    return cookieStore.get("userId")?.value
}

export function getYoutubeVideoSrc(videoId: string, queue: string[]) {
    let src = `https://www.youtube.com/embed/${videoId}?&autoplay=1&controls=1&disablekb=0&iv_load_policy=3&rel=0&enablejsapi=1&mute=1`
    if (queue.length > 0) {
        src = src + `&playlist=${queue.join(",")}`
    }
    return src
}

export const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URI

export const socket = io(socketUrl, {
    autoConnect: false,
})

export function isArrayEqual<T>(
    array1: T[],
    array2: T[],
    compareFn: (a: T, b: T) => boolean
) {
    if (array1.length !== array2.length) {
        return false
    }

    for (let i = 0; i < array1.length; i++) {
        const item = array1[i]

        for (let j = 0; j < array2.length; j++) {
            if (compareFn(item, array2[j])) {
                break
            }
            if (j === array2.length - 1) {
                return false
            }
        }
    }
    return true
}

export function daysSince(date: string) {
    return Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)
    )
}
