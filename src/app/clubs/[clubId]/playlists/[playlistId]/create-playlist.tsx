"use client"
import { useRouter } from "next/navigation"
import { createNewPlaylist } from "@/actions/playlists"
import { Button } from "@/components/ui/button"
import { Club } from "@/lib/types"
import { Plus } from "lucide-react"
import React from "react"

type Props = {
    playlistCount: number
    clubId: Club["id"]
}

export default function CreatePlaylist({ playlistCount, clubId }: Props) {
    const router = useRouter()

    async function handleCreatePlaylist() {
        const playlistId = await createNewPlaylist(
            `Playlist #${playlistCount + 1}`,
            clubId
        )
        router.push(`${clubId}/playlists/${playlistId}`)
    }

    return (
        <Button
            onClick={handleCreatePlaylist}
            size="icon"
            variant="ghost"
            className=" rounded-full "
        >
            <Plus size={20} />
        </Button>
    )
}
