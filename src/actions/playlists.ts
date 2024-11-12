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

    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }

    const playlist = await res.json()

    revalidatePath(`/dashboard/clubs/${clubId}`)
    return playlist.id
}

export async function createPlaylist(formData: FormData) {
    const name = formData.get("name")
    const description = formData.get("description")
    const clubId = formData.get("clubId")

    if (!(name && description && formData.has("thumbnail"))) {
        throw new Error("Please fill all inputs")
    }

    const res = await fetch(apiRoute(`/clubs/${clubId}/playlists`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
        body: JSON.stringify({
            name,
            description,
        }),
    })

    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }

    const playlistId = await res.json()
    await uploadPlaylistThumbnail(playlistId, formData)

    revalidateTag(`/clubs/${clubId}`)
    return playlistId
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

export async function addVideoToPlaylist(playlistId: string, formData: FormData) {
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

export async function removeVideoFromPlaylist(playlistId: string, videoId: string) {
    const res = await fetch(apiRoute(`/playlists/${playlistId}/list/${videoId}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
    })

    if (!res.ok) {
        console.log(await res.json())
        throw new Error(res.statusText)
    }

    revalidateTag(`/playlists/${playlistId}`)
}
