"use server"

import { apiRoute, extractAccessToken, getUserId } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function fetchClubById(clubId: string) {
    const res = await fetch(apiRoute(`/clubs/${clubId}`), {
        next: {
            tags: [`/clubs/${clubId}`]
        }
    })
    const body = await res.json()
    if (!res.ok) {
        console.log(body)
        throw new Error(res.statusText)
    }
    return body
}

export async function isClubCreator(clubId: string) {
    const userId = getUserId(cookies())
    return userId === clubId
}

export async function getVideoById(id: string) {
    const res = await fetch(apiRoute(`/youtube/videos/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!res.ok) {
        throw "Error while fetching: getVideoById"
    }

    const data = await res.json()
    return data.items[0]
}

export async function addVideoToQueue(clubId: number, formData: FormData) {
    const videoId = formData.get("videoId")
    const res = await fetch(apiRoute(`/clubs/${clubId}/queue`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(cookies()),
        },
        body: JSON.stringify({
            videoId,
        }),
    })

    if (!res.ok) {
        console.log(await res.json())
        throw new Error(res.statusText)
    }
    revalidateTag(`/clubs/${clubId}`)
}
