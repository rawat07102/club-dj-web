import { fetchPlaylistById } from "@/actions/clubs";
import IframePlayer from "./i-frame-player";
import { redirect } from "next/navigation";
import Chat from "./chat"
import Queue from "./queue"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
    params: Promise<{
        playlistId: string;
        clubId: string
    }>
    searchParams: Promise<{
        videoId?: string
    }>
}

export default async function PlaylistPlayer(props: Props) {
    const params = await props.params
    const searchParams = await props.searchParams
    const { playlistId, clubId } = params
    const playlist = await fetchPlaylistById(playlistId)

    if (!playlist.list) {
        redirect(`/clubs/${clubId}/playlists/${playlistId}`)
    }

    const videoId = searchParams.videoId ?? playlist.list[0]

    return (
        <main className="w-full flex">
            <div className="h-screen flex-1">
                <IframePlayer videoId={videoId} queue={playlist.list} />
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
                        <Queue videoId={videoId} queue={playlist.list} />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}
