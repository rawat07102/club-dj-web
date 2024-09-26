"use server"

import { apiRoute, getUserId } from "@/lib/utils"
import { cookies } from "next/headers"

export async function fetchClubById(clubId: string) {
    const res = await fetch(apiRoute(`/clubs/${clubId}`))
    const club = await res.json()
    return club
}

export async function isClubCreator(clubId: string) {
    const userId = getUserId(cookies())
    return userId === clubId
}

export async function getVideoById(id: string) {
    const res = await fetch(apiRoute(`youtube/video/${id}`), {
        next: {
            tags: ["getVideoById"],
        },
    })
    if (!res.ok) {
        throw "Error while fetching: getVideoById"
    }

    const data = await res.json()
    return data.items[0]
}
