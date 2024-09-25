"use client"

import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getYoutubeVideoSrc } from "@/lib/utils"
import Chat from "./chat"
import Queue from "./queue"

export default function ClubPage() {
    const [currentVideo, setCurrentVideo] = useState({
        id: "1",
        title: "Amazing Song",
        artist: "Cool Artist",
        videoId: "dQw4w9WgXcQ",
    })
    const [isPlaying, setIsPlaying] = useState(false)
    const [chatMessages, setChatMessages] = useState([
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
    ])

    const videoQueue = [
        {
            id: "2",
            title: "Awesome Tune",
            artist: "Great Band",
            videoId: "dQw4w9WgXcQ",
        },
        {
            id: "3",
            title: "Catchy Melody",
            artist: "Pop Star",
            videoId: "dQw4w9WgXcQ",
        },
        {
            id: "4",
            title: "Epic Ballad",
            artist: "Rock Legend",
            videoId: "dQw4w9WgXcQ",
        },
        {
            id: "5",
            title: "Funky Groove",
            artist: "Disco King",
            videoId: "dQw4w9WgXcQ",
        },
    ]

    const videoRef = useRef<HTMLIFrameElement>(null)

    const playNextVideo = () => {
        const nextVideo = videoQueue[0]
        setCurrentVideo(nextVideo)
        setIsPlaying(true)
    }

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const input = form.elements.namedItem("message") as HTMLInputElement
        const newMessage = {
            id: chatMessages.length + 1,
            user: "You",
            message: input.value,
        }
        setChatMessages([...chatMessages, newMessage])
        input.value = ""
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <main className="flex w-full h-full max-h-screen">
                <div className="w-full">
                    <iframe
                        className="flex-1 h-full w-full"
                        src={getYoutubeVideoSrc(currentVideo.videoId)}
                        title={currentVideo.title}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                </div>
                <Tabs
                    defaultValue="chat"
                    className="relative max-w-sm w-full bg-white overflow-hidden"
                >
                    <TabsList className="absolute grid w-full grid-cols-2 top-0 z-50">
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                        <TabsTrigger value="queue">Up Next</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="pl-4 pr-1">
                        <Chat />
                    </TabsContent>
                    <TabsContent value="queue" className="px-4">
                        <Queue />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
