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
