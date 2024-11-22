import { fetchPlaylistById } from "@/actions/clubs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IframePlayer from "../player/i-frame-player"
import Chat from "../player/chat"
import Queue from "../player/queue"

type Props = {
    params: Promise<{
        clubId: string
        playlistId: string
        videoId: string
    }>
}

function getQueueForIframe(current: string, list?: string[]) {
    if (!list) {
        return []
    }

    const index = list.findIndex((id) => id === current)

    if (index === -1) {
        return []
    }

    return list.slice(index)
}

export default async function VideoPage(props: Props) {
    const params = await props.params

    const { clubId, playlistId, videoId } = params

    const playlist = await fetchPlaylistById(playlistId)
    const queue = getQueueForIframe(videoId, playlist.list)

    return (
        <main className="w-full flex">
            <div className="h-screen flex-1">
                <IframePlayer startingVideo={videoId} queue={queue} />
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
