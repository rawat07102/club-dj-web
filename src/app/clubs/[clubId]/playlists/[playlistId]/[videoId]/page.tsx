import { fetchPlaylistById } from "@/actions/clubs"
import Player from "./player"
import Chat from "./chat"
import Queue from "./queue"
import { Separator } from "@/components/ui/separator"

type Props = {
    params: {
        clubId: string
        playlistId: string
        videoId: string
    }
}

export default async function PlaylistPlayer({
    params: { clubId, playlistId, videoId },
}: Props) {
    const playlist = await fetchPlaylistById(playlistId)

    return (
        <main className="w-full flex">
            <div className="w-full max-w-xs">
                <div className="flex-col top-0 p-2 z-50 gap-2 w-full bg-background flex justify-center items-center">
                    <h1 className="text-lg">Queue</h1>
                    <Separator />
                </div>
                <Queue videoId={videoId} queue={playlist.list!} />
            </div>
            <div className="h-screen flex-1">
                <Player videoId={videoId} />
            </div>
            <div className="w-full max-w-sm">
                <Chat clubId={clubId} />
            </div>
        </main>
    )
}
