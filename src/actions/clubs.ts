"use server"

import { Club } from "@/lib/types"
import { apiRoute, extractAccessToken, getUserId } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

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
            revalidate: 2000,
        },
    })
    const clubs = await res.json()
    return clubs
}

export async function createClub() {
    const res = await fetch(apiRoute("/clubs"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
    })

    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }

    const clubId = await res.json()
    revalidateTag("myClubs")
    return clubId
}

export default async function updateClubDetails(formData: FormData) {
    const clubId = formData.get("clubId")

    if (!clubId) {
        throw new Error("Club Id is required as formData field.")
    }

    const name = formData.get("name")
    const description = formData.get("description")
    const genres = formData.getAll("genres")

    const body: Record<string, any> = {}
    if (name) {
        body["name"] = name
    }
    if (description) {
        body["description"] = description
    }
    if (genres.length > 0) {
        body["genreIds"] = genres
    }

    const res = await fetch(apiRoute(`/clubs/${clubId}`), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }

    if (formData.has("thumbnail")) {
        await uploadClubThumbnail(clubId.toString(), formData)
    }
    revalidateTag(`/clubs/${clubId}`)
    return clubId
}

export async function uploadClubThumbnail(
    clubId: Club["id"],
    formData: FormData
) {
    await fetch(apiRoute(`/clubs/${clubId}/thumbnail`), {
        method: "PUT",
        headers: {
            Authorization: extractAccessToken(await cookies()),
        },
        body: formData,
    })
}

export async function fetchClubById(clubId: string): Promise<Club> {
    const res = await fetch(apiRoute(`/clubs/${clubId}`), {
        next: {
            tags: [`/clubs/${clubId}`],
        },
    })
    const body = await res.json()
    if (!res.ok) {
        console.log(body)
        throw new Error(res.statusText)
    }
    return body
}

export async function deleteClub(clubId: string) {
    await fetch(apiRoute(`/clubs/${clubId}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
    })
    revalidateTag("/clubs")
}

export async function isClubCreator(creatorId: string) {
    const userId = getUserId(await cookies())
    return userId == creatorId
}

export async function voteSkip(clubId: Club["id"]) {
    const res = await fetch(apiRoute(`/clubs/${clubId}/voteSkipCount`), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
    })
    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }
}

export async function addVideoToQueue(
    clubId: string,
    formData: FormData
): Promise<Club> {
    const videoId = formData.get("videoId")
    if (!videoId) {
        throw new Error("Video Id cannot be empty.")
    }
    const res = await fetch(apiRoute(`/clubs/${clubId}/queue`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
        body: JSON.stringify({
            videoId,
        }),
    })
    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }
    return res.json()
}
