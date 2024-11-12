"use client"
import { deletePlaylist } from "@/actions/playlists"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Playlist } from "@/lib/types"
import { Trash2 } from "lucide-react"

type Props = {
    clubId: string
    playlist: Playlist
}

export default function DeletePlaylist({ playlist, clubId }: Props) {
    const { id, thumbnail, name, description } = playlist
    async function handleDelete() {
        await deletePlaylist(clubId, id)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="hover:text-destructive rounded-full"
                    variant="ghost"
                    size="icon"
                >
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <div className="flex gap-4">
                    <div
                        title="click to upload new thumbnail"
                        className="aspect-square bg-gray-200
                        rounded-lg w-40 overflow-hidden"
                    >
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt="Club Thumbnail"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex
                                        items-center justify-center
                                        text-gray-400"
                            >
                                No image
                            </div>
                        )}
                    </div>
                    <div className="flex grow flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold capitalize">
                                {name}
                            </h1>
                            <p
                                className="text-gray-600 text-ellipsis
                                text-wrap overflow-hidden"
                            >
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleDelete} variant="destructive">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
