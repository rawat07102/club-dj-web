"use client"
import { addVideoToQueue, fetchClubById, voteSkip } from "@/actions/clubs"
import { getAuthToken } from "@/actions/user"
import { Button } from "@/components/ui/button"
import { Club } from "@/lib/types"
import { socket } from "@/lib/utils"
import React from "react"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import Script from "next/script"
import { PlayerEvents, YT_PLAYER_STATE } from "@/lib/types/ytIframe.types"
import QueueCard from "../playlists/[playlistId]/player/queue-card"
import AddVideo from "../playlists/[playlistId]/add-video"

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

    const [playerPayload, setPlayerPayload] =
        React.useState<PlayerPayload | null>(null)
    const [addVideoId, setAddVideoId] = React.useState("")
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
            socket.off("new-message")
            socket.disconnect()
        }
    }, [])
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
                    <div className="h-full w-full flex justify-center items-center">
                        <span>No Current Video.</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col bg-secondary w-full max-w-sm">
                <div className="flex justify-between">
                    <Button onClick={() => voteSkip(clubId)}>
                        Vote Skip {playerPayload && playerPayload.voteSkipCount}
                    </Button>
                </div>
                {club && playerPayload && (
                    <div className="flex flex-col gap-2">
                        {club.queue?.map((id) => (
                            <QueueCard key={id} videoId={id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
