import { fetchPlaylistById } from "@/actions/clubs"
import Player from "./player"
import Chat from "./chat"
import Queue from "./queue"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
    params: Promise<{
        clubId: string
        playlistId: string
        videoId: string
    }>
}

export default async function PlaylistPlayer(props: Props) {
    const params = await props.params

    const { clubId, playlistId, videoId } = params

    const playlist = await fetchPlaylistById(playlistId)

    return (
        <main className="w-full flex">
            <div className="h-screen flex-1">
                <Player videoId={videoId} />
            </div>
            <div className="w-full max-w-sm">
                <Tabs defaultValue="chat" className="relative">
                    <TabsList className="flex gap-2 absolute w-full z-50">
                        <TabsTrigger value="chat" className="flex-1">
                            Chat
                        </TabsTrigger>
                        <TabsTrigger value="queue" className="flex-1">
                            Queue
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="mt-0">
                        <Chat clubId={clubId} />
                    </TabsContent>
                    <TabsContent value="queue" className="mt-0">
                        <Queue videoId={videoId} queue={playlist.list!} />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}

//<div className="w-full max-w-xs">
//    <div className="flex-col top-0 p-2 z-50 gap-2 w-full
//    bg-background flex justify-center items-center">
//        <h1 className="text-lg">Queue</h1>
//        <Separator />
//    </div>
//    <Queue videoId={videoId} queue={playlist.list!} />
//</div>
