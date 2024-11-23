"use server"
import { Club, Playlist } from "@/lib/types"
import { apiRoute, extractAccessToken } from "@/lib/utils"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function createNewPlaylist(name: string, clubId: Club["id"]) {
    const res = await fetch(apiRoute(`/clubs/${clubId}/playlists`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
        body: JSON.stringify({
            name,
            description: "",
        }),
    })

    const body = await res.json()

    if (!res.ok) {
        console.error(body)
        throw new Error(res.statusText)
    }

    revalidatePath(`/dashboard/clubs/${clubId}`)
    return body
}

export async function deletePlaylist(clubId: string, playlistId: string) {
    await fetch(apiRoute(`/clubs/${clubId}/playlists/${playlistId}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
    })
    revalidateTag(`/clubs/${clubId}`)
}

export async function uploadPlaylistThumbnail(
    playlistId: Playlist["id"],
    formData: FormData
) {
    await fetch(apiRoute(`/playlists/${playlistId}/thumbnail`), {
        method: "PUT",
        headers: {
            Authorization: extractAccessToken(await cookies()),
        },
        body: formData,
    })
}

export async function addVideoToPlaylist(
    playlistId: string,
    formData: FormData
) {
    const videoId = formData.get("videoId")
    const res = await fetch(apiRoute(`/playlists/${playlistId}/list`), {
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
        console.log(await res.json())
        throw new Error(res.statusText)
    }

    revalidateTag(`/playlists/${playlistId}`)
}

export async function removeVideoFromPlaylist(
    playlistId: string,
    videoId: string
) {
    const res = await fetch(
        apiRoute(`/playlists/${playlistId}/list/${videoId}`),
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: extractAccessToken(await cookies()),
            },
        }
    )

    if (!res.ok) {
        console.log(await res.json())
        throw new Error(res.statusText)
    }

    revalidateTag(`/playlists/${playlistId}`)
}

export async function fetchPlaylistById(playlistId: string): Promise<Playlist> {
    const res = await fetch(apiRoute(`/playlists/${playlistId}`), {
        next: {
            tags: [`/playlists/${playlistId}`],
        },
    })
    const body = await res.json()
    if (!res.ok) {
        console.error(body)
        throw new Error(res.statusText)
    }
    return body
}
