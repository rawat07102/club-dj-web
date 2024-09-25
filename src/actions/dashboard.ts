"use server"
import { User, Club } from "@/lib/types"
import { apiRoute, extractAccessToken, getUserId } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function createClub(name: string, description: string) {
    const res = await fetch(apiRoute("/clubs"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(cookies()),
        },
        body: JSON.stringify({
            name,
            description,
        }),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
    revalidateTag("clubs")
}

export async function uploadClubThumbnail(
    clubId: Club["id"],
    formData: FormData
) {
    await fetch(apiRoute(`/clubs/${clubId}/thumbnail`), {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: extractAccessToken(cookies()),
        },
        body: formData,
    })
}

export async function getUser(id?: string): Promise<User> {
    const userId = id || getUserId(cookies())
    const res = await fetch(apiRoute(`/users/${userId}`))

    const user = await res.json()
    return user
}

export async function getClubs(): Promise<Club[]> {
    const res = await fetch(apiRoute("/clubs"), {
        next: {
            tags: ["clubs"],
        },
    })
    const clubs = await res.json()
    return clubs
}
