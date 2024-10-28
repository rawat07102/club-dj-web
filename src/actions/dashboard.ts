"use server"
import { User, Club } from "@/lib/types"
import { apiRoute, extractAccessToken, getUserId } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function createClub(formData: FormData) {
    const name = formData.get("name")
    const description = formData.get("description")
    const genres = formData.getAll("genres")

    if (!(name && description && formData.has("thumbnail"))) {
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
            genreIds: genres,
        }),
    })

    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }

    const clubId = await res.json()
    await uploadClubThumbnail(clubId, formData)
    revalidateTag("clubs")
    return clubId
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

type QueryParams = {
    [key: string]: string | number
}

export async function getClubs(queryParams: QueryParams = {}): Promise<Club[]> {
    let url = "/clubs?"
    Object.keys(queryParams).forEach((key) => {
        url = url + `${key}=${queryParams[key]}&`
    })

    const res = await fetch(apiRoute(url), {
        next: {
            tags: [url],
        },
    })
    const clubs = await res.json()
    return clubs
}
