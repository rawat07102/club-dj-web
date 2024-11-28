"use client"
import { getPlaylistById } from "@/actions/playlists"
import IframePlayer from "./i-frame-player"
import { redirect } from "next/navigation"
import Chat from "./chat"
import Queue from "./queue"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useSWR from "swr"
import React from "react"

type Props = {
    params: Promise<{
        playlistId: string
        clubId: string
    }>
    searchParams: Promise<{
        startingVideo?: string
    }>
}

export default function PlaylistPlayer(props: Props) {
    const params = React.use(props.params)
    const searchParams = React.use(props.searchParams)
    const { playlistId, clubId } = params
    const {
        data: playlist,
        isLoading,
        error,
    } = useSWR(playlistId, getPlaylistById)
    const startingVideo =
        searchParams.startingVideo ||
        (playlist && playlist.list ? playlist.list[0] : "")
    const [currentVideo, setCurrentVideo] = React.useState(startingVideo)

    React.useEffect(() => {
        window.currentIndex =
            playlist?.list?.findIndex((id) => id === currentVideo) ?? 0
    }, [currentVideo])

    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!playlist || !playlist.list) {
        return redirect(`/clubs/${clubId}`)
    }

    return (
        <main className="w-full flex">
            <div className="h-screen flex-1">
                <IframePlayer
                    currentVideo={currentVideo}
                    onNewVideo={(id) => setCurrentVideo(id)}
                    startingVideo={startingVideo || playlist.list[0]}
                    queue={playlist.list}
                />
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
                        <Queue
                            videoId={currentVideo}
                            queue={playlist.list}
                            onNewVideo={(id) => setCurrentVideo(id)}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}
