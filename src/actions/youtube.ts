"use server"

import { YTVideo } from "@/lib/types"
import { apiRoute } from "@/lib/utils"

export async function getVideoById(id: string): Promise<YTVideo> {
    const res = await fetch(apiRoute(`/youtube/videos/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const body = await res.json()
    if (!res.ok) {
        console.error(body)
        throw "Error while fetching: getVideoById"
    }

    return body.items[0].snippet
}
