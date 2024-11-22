import { getYoutubeVideoSrc } from "@/lib/utils"
import Script from "next/script"
import React from "react"
import { YT_PLAYER_STATE } from "@/lib/types/ytIframe.types"
type Props = {
    queue: string[]
    startingVideo: string
    currentVideo: string
    onNewVideo: (id: string) => void
}

export default function IframePlayer({
    queue,
    startingVideo,
    currentVideo,
    onNewVideo,
}: Props) {
    return (
        <div className="w-full h-full">
            {currentVideo && (
                <>
                    <iframe
                        id="yt-playlist-player"
                        className="flex-1 h-full w-full"
                        src={getYoutubeVideoSrc(startingVideo, [])}
                        allow="accelerometer; clipboard-write; encrypted-media;
                        gyroscope; picture-in-picture; web-share"
                    ></iframe>

                    <Script
                        src="https://www.youtube.com/iframe_api"
                        onReady={() => {
                            window.onYouTubeIframeAPIReady = () => {
                                window.player = new window.YT.Player(
                                    "yt-playlist-player",
                                    {
                                        events: {
                                            onReady: () => {
                                                console.log(window.player)
                                            },
                                            onStateChange: (state) => {
                                                if (
                                                    state.data ===
                                                    YT_PLAYER_STATE.ENDED
                                                ) {
                                                    const currentIndex =
                                                        window.currentIndex
                                                    const newVideo =
                                                        queue[currentIndex + 1]
                                                    if (newVideo) {
                                                        window.player.loadVideoById(
                                                            newVideo
                                                        )
                                                        onNewVideo(newVideo)
                                                    }
                                                }
                                            },
                                        },
                                    }
                                )
                            }
                        }}
                    ></Script>
                </>
            )}
        </div>
    )
}
