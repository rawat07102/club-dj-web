import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { addVideoToPlaylist } from "@/actions/playlists"
import { PlusCircle } from "lucide-react"

type Props = {
    playlistId: string
}

export default function AddVideo({ playlistId }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full" variant="ghost" size="icon">
                    <PlusCircle />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm md:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add a video to playlist</DialogTitle>
                    <DialogDescription>
                        Enter the YouTube ID of video of your choice to add it
                        to the playlist.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <form
                        action={addVideoToPlaylist.bind(null, playlistId)}
                        id="add-to-queue"
                        className="flex flex-col md:flex-row md:items-center gap-4"
                    >
                        <Label htmlFor="video-id" className="">
                            YouTube video ID
                        </Label>
                        <Input
                            id="video-id"
                            defaultValue="LDU_Txk06tM"
                            className="flex-1"
                            name="videoId"
                        />
                    </form>
                </div>
                <DialogFooter>
                    <Button form="add-to-queue" type="submit">
                        Add To Playlist
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
