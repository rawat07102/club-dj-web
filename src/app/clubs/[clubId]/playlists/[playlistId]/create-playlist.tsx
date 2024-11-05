"use client"
import { useRouter } from "next/navigation"
import { createNewPlaylist, createPlaylist } from "@/actions/playlists"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
        const playlistId = await createNewPlaylist(`Playlist #${playlistCount + 1}`, clubId)
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

//export default async function CreatePlaylist() {
//    return (
//        <Dialog>
//            <DialogTrigger asChild>
//                <Button size="icon" variant="ghost" className=" rounded-full ">
//                    <Plus size={20}/>
//                </Button>
//            </DialogTrigger>
//            <DialogContent>
//                <DialogHeader>
//                    <DialogTitle>Create a New Playlist</DialogTitle>
//                    <DialogDescription>
//                        Fill in the details to create a playlist.
//                    </DialogDescription>
//                </DialogHeader>
//                <form
//                    action={createPlaylist}
//                    id="create-playlist"
//                    className="grid gap-4 py-4"
//                >
//                    <div className="grid grid-cols-4 items-center gap-4">
//                        <Label className="text-right">
//                            Name
//                        </Label>
//                        <Input name="name" className="col-span-3" />
//                    </div>
//                    <div className="grid grid-cols-4 items-center gap-4">
//                        <Label
//                            className="text-right"
//                        >
//                            Description
//                        </Label>
//                        <Input name="description" className="col-span-3" />
//                    </div>
//                    <div className="grid w-full max-w-sm items-center gap-1.5">
//                        <Label htmlFor="file">Thumbnail</Label>
//                        <Input id="file" type="file" name="file" />
//                    </div>
//                </form>
//                <DialogFooter>
//                    <Button form="create-playlist" type="submit">
//                        Create Playlist
//                    </Button>
//                </DialogFooter>
//            </DialogContent>
//        </Dialog>
//    )
//}
