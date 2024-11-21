"use client"
import { getYoutubeVideoSrc } from "@/lib/utils"
import Script from "next/script"
import React from "react"
import { YT_PLAYER_STATE } from "@/lib/types/ytIframe.types"
import { useRouter, useSearchParams } from "next/navigation"

const queue = ["qR2QIJdtgiU", "NLi2v-Gq-5A"]

export default function Test() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const currentlyPlaying = searchParams.get("currentlyPlaying") || queue[0]
    const currentPlayingIndex = React.useMemo(() => {
        return queue.findIndex((id) => id === currentlyPlaying)
    }, [currentlyPlaying])

    return (
        <div
            className="flex gap-2 bg-secondary mx-auto aspect-video
            max-w-screen-sm border w-full"
        >
            {currentlyPlaying && (
                <>
                    <iframe
                        id="player"
                        className="flex-1 h-full w-full"
                        src={getYoutubeVideoSrc(currentlyPlaying, [])}
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
                                            console.log("YT ready")
                                            console.log(window.player)
                                        },
                                        onStateChange: (state) => {
                                            if (
                                                state.data ===
                                                YT_PLAYER_STATE.ENDED
                                            ) {
                                                router.push(
                                                    `/test?currentlyPlaying=
                                            ${queue[currentPlayingIndex + 1]}`
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
