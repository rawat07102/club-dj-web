"use client"
import { getYoutubeVideoSrc } from "@/lib/utils"
import Script from "next/script"
import { VideoOff } from "lucide-react"
import React from "react"

type Props = {
    videoId: string
    queue: string[]
}

export default function Player({ videoId, queue }: Props) {
    if (videoId === "empty-list") {
        return (
            <div
                className="flex justify-center bg-secondary items-center
                flex-1 h-full w-full"
            >
                <div className="flex gap-2">
                    <VideoOff size={24} />
                    <h1 className="text-2xl">No Video</h1>
                </div>
            </div>
        )
    }

    return (
        <>
            <iframe
                id="player"
                className="flex-1 h-full w-full"
                src={getYoutubeVideoSrc(videoId, queue)}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope;
                picture-in-picture; web-share"
            ></iframe>
            <Script
                src="https://www.youtube.com/iframe_api"
                async
                onReady={() => {
                    window.onYouTubeIframeAPIReady = () => {
                        const player = new window.YT.Player("player", {
                            events: {
                                onReady: () => {
                                    console.log("YT ready")
                                    console.log(player)
                                },
                            },
                        })
                    }
                }}
            ></Script>
        </>
    )
}
