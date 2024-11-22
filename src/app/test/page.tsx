"use client"

import { YT_PLAYER_STATE } from "@/lib/types/ytIframe.types"
import { cn, getYoutubeVideoSrc } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import Script from "next/script"
import React from "react"

const queue = ["qR2QIJdtgiU", "NLi2v-Gq-5A", "Ijk4j-r7qPA", "8DyziWtkfBw"]

export default function Test() {
    const searchParams = useSearchParams()
    const startingVideo = searchParams.get("startingVideo") || queue[0]
    const [currentVideo, setCurrentVideo] = React.useState(startingVideo)

    const currentIndex = React.useMemo(() => {
        return queue.findIndex((id) => id === currentVideo)
    }, [currentVideo])

    return (
        <div className="flex gap-1 w-full h-full">
            <div className="flex-1 ">
                <iframe
                    id="yt-player"
                    className="flex-1 h-full w-full"
                    src={getYoutubeVideoSrc(startingVideo, [])}
                    allow="accelerometer; clipboard-write; encrypted-media;
                        gyroscope; picture-in-picture; web-share"
                ></iframe>
            </div>
            <Script
                src="https://www.youtube.com/iframe_api"
                async
                onReady={() => {
                    window.onYouTubeIframeAPIReady = () => {
                        window.player = new window.YT.Player("yt-player", {
                            events: {
                                onReady: () => {
                                    console.log("NEW YT ready!!!")
                                    console.log(window.player)
                                },
                                onStateChange: (state) => {
                                    console.log(state)
                                    console.log(window.player.getVideoUrl())
                                    console.log(
                                        window.player.getPlaylistIndex()
                                    )
                                    if (state.data === YT_PLAYER_STATE.ENDED) {
                                        const newVideo = queue[currentIndex + 1]
                                        window.player.loadVideoById(newVideo)
                                        setCurrentVideo(newVideo)
                                    }
                                },
                            },
                        })
                    }
                }}
            ></Script>
            <div className="flex flex-col w-full max-w-sm">
                {queue.map((id) => (
                    <div
                        onClick={() => {
                            window.player.loadVideoById(id)
                            setCurrentVideo(id)
                        }}
                        key={id}
                        className={cn(
                            "p-1 shadow cursor-pointer hover:bg-primary/10",
                            {
                                "bg-primary/20": currentVideo === id,
                            }
                        )}
                    >
                        {id}
                    </div>
                ))}
            </div>
        </div>
    )
}
