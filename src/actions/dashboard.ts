"use server"
import { User, Club } from "@/lib/types"
import { apiRoute, extractAccessToken, getUserId } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function createClub(formData: FormData) {
    const name = formData.get("name")
    const description = formData.get("description")
    if (!(name && description && formData.has("file"))) {
        throw new Error("Please fill all inputs")
    }
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
    const clubId = await res.json()
    console.log(clubId)
    await uploadClubThumbnail(clubId, formData)
    revalidateTag("clubs")
}

export async function uploadClubThumbnail(
    clubId: Club["id"],
    formData: FormData
) {
    await fetch(apiRoute(`/clubs/${clubId}/thumbnail`), {
        method: "PUT",
        headers: {
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
