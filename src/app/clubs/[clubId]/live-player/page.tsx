"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchClubById, voteSkip } from "@/actions/clubs"
import { getAuthToken } from "@/actions/user"
import Queue from "../playlists/[playlistId]/player/queue"
import { Club } from "@/lib/types"
import { socket } from "@/lib/utils"
import React from "react"
import useSWR from "swr"
import Script from "next/script"
import { PlayerEvents, YT_PLAYER_STATE } from "@/lib/types/ytIframe.types"
import { Button } from "@/components/ui/button"
import AddVideoDialog from "./add-video-dialog"
import Chat, { Message } from "./chat"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

type Props = {
    params: Promise<{
        clubId: string
    }>
}

function getSrc(videoId: string, startTime: number = 0) {
    let src = `https://www.youtube.com/embed/${videoId}?&autoplay=1&controls=1&disablekb=1&iv_load_policy=3&rel=0&enablejsapi=1&mute=1`
    if (startTime > 0) {
        src += `&start=${startTime}`
    }
    return src
}

interface PlayerPayload {
    currentVideo: string | null
    currentVideoStartTime: Date | null
    voteSkipCount: number
    id: Club["id"]
}

export default function Test(props: Props) {
    const { clubId } = React.use(props.params)
    const [messages, setMessages] = React.useState<Message[]>([])
    const [message, setMessage] = React.useState<string>("")

    const [playerPayload, setPlayerPayload] =
        React.useState<PlayerPayload | null>(null)
    const {
        data: club,
        isLoading,
        error,
    } = useSWR(clubId, fetchClubById, {
        refreshInterval: 1000 * 60,
    })

    React.useEffect(() => {
        async function socketConnection() {
            const accessToken = await getAuthToken()
            socket.auth = {
                accessToken,
            }
            socket.connect()
        }

        if (!socket.connected) {
            socketConnection()
        }

        socket.on("connect", () => {
            console.log(`connected with id ${socket.id}`)
            socket.emit("join-room", clubId, (payload: PlayerPayload) => {
                console.log(payload)
                setPlayerPayload(payload)
            })
        })

        socket.on("play-next", (data: PlayerPayload) => {
            setPlayerPayload(data)
            if (data.currentVideo) {
                window.player.loadVideoById(data.currentVideo)
            }
        })

        return () => {
            socket.emit("leave-room", clubId)
            socket.disconnect()
        }
    }, [])

    React.useEffect(() => {
        socket.on("new-message", onNewMessage)
        return () => {
            socket.off("new-message")
        }
    }, [socket, messages])

    function onNewMessage(newMessage: any) {
        console.log(messages)
        setMessages([...messages, newMessage])
    }

    const startTime = React.useMemo(() => {
        if (!playerPayload?.currentVideoStartTime) {
            return 0
        }
        return Math.round(
            (Date.now() -
                new Date(playerPayload.currentVideoStartTime).getTime()) /
                1000
        )
    }, [playerPayload])

    const handleStateChange: PlayerEvents["onStateChange"] = (state) => {
        if (state.data === YT_PLAYER_STATE.BUFFERING) {
            if (playerPayload?.currentVideoStartTime) {
                const videoDuration = window.player.getDuration()
                const now = Date.now()
                const startTime = playerPayload.currentVideoStartTime.getTime()
                const correctTime = (now - startTime) / 1000
                if (correctTime > 0) {
                    const error = Math.abs(correctTime - videoDuration)
                    console.log(error)
                    if (error > 5) {
                        window.player.seekTo(correctTime, false)
                    }
                }
            }
        }
    }

    if (!club && isLoading) {
        return <div>loading...</div>
    }

    if (!club && error) {
        return <div>{error}</div>
    }
    if (!club) {
        return null
    }

    return (
        <div className="flex h-screen">
            <div className="h-full w-full">
                {playerPayload?.currentVideo && (
                    <>
                        <iframe
                            id="yt-live-player"
                            className="flex-1 h-full w-full"
                            src={getSrc(playerPayload.currentVideo, startTime)}
                            allow="accelerometer; clipboard-write;
                                encrypted-media; gyroscope; picture-in-picture;
                                web-share"
                        ></iframe>
                        <Script
                            src="https://www.youtube.com/iframe_api"
                            onReady={() => {
                                window.onYouTubeIframeAPIReady = () => {
                                    window.player = new window.YT.Player(
                                        "yt-live-player",
                                        {
                                            events: {
                                                onReady: () => {
                                                    console.log(window.player)
                                                },
                                                onStateChange:
                                                    handleStateChange,
                                            },
                                        }
                                    )
                                }
                            }}
                        ></Script>
                    </>
                )}
                {!playerPayload?.currentVideo && (
                    <div className="h-full bg-primary/10 w-full flex justify-center items-center">
                        <span>No Current Video.</span>
                    </div>
                )}
            </div>
            <div className="relative w-full max-w-sm">
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
                        <div className="relative flex flex-col justify-end w-full h-screen ">
                            <Chat messages={messages} />
                            <form className="flex z-50 space-x-2 w-[90%] mx-auto pb-2">
                                <Input
                                    placeholder="Type your message..."
                                    className="flex-grow"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                />
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        socket.emit("message", {
                                            clubId,
                                            message,
                                        })
                                        setMessage("")
                                    }}
                                    disabled={!message}
                                >
                                    <Send size="20px" />
                                </Button>
                            </form>
                        </div>
                    </TabsContent>
                    <TabsContent value="queue" className="mt-0">
                        <Queue
                            videoId={playerPayload?.currentVideo || ""}
                            queue={club.queue}
                            onNewVideo={() => {}}
                        />
                        <div className="absolute bottom-4 right-4 flex items-center gap-4">
                            <Button
                                onClick={() => voteSkip(clubId)}
                                className="flex gap-1"
                            >
                                <span>Vote Skip</span>
                                {playerPayload && (
                                    <span className="ml-1">
                                        {playerPayload.voteSkipCount}
                                    </span>
                                )}
                            </Button>
                            <AddVideoDialog clubId={clubId} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
