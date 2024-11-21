"use client"
import { getYoutubeVideoSrc } from "@/lib/utils"
import Script from "next/script"
import React from "react"
import { YT_PLAYER_STATE } from "@/lib/types/ytIframe.types"
import { usePathname, useRouter } from "next/navigation"

type Props = {
    queue: string[]
    videoId: string
}

export default function IframePlayer({ queue, videoId }: Props) {
    const router = useRouter()

    const videoIndexInQueue = React.useMemo(() => {
        return queue.findIndex((id) => id === videoId)
    }, [videoId])

    const currentPath = usePathname()

    return (
        <div className="w-full h-full">
            {videoId && (
                <>
                    <iframe
                        id="player"
                        className="flex-1 h-full w-full"
                        src={getYoutubeVideoSrc(videoId, [])}
                        allow="accelerometer; clipboard-write; encrypted-media;
                        gyroscope; picture-in-picture; web-share"
                    ></iframe>

                    <Script
                        src="https://www.youtube.com/iframe_api"
                        async
                        onReady={() => {
                            window.onYouTubeIframeAPIReady = () => {
                                window.player = new window.YT.Player("player", {
                                    events: {
                                        onReady: () => {
                                            console.log("YT ready!!!")
                                            console.log(window.player)
                                        },
                                        onStateChange: (state) => {
                                            console.log(state.data)
                                            if (
                                                state.data ===
                                                YT_PLAYER_STATE.ENDED
                                            ) {
                                                console.log(
                                                    queue[videoIndexInQueue + 1]
                                                )
                                                router.replace(
                                                    `${currentPath}/${queue[videoIndexInQueue + 1]}`
                                                )
                                            }
                                        },
                                    },
                                })
                            }
                        }}
                    ></Script>
                </>
            )}
        </div>
    )
}
