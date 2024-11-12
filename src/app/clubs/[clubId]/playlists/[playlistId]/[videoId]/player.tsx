"use client"

import { getYoutubeVideoSrc } from "@/lib/utils"
import { VideoOff } from "lucide-react"
import React from "react"

type Props = {
    videoId: string
}

export default function Player({ videoId }: Props) {
    if (videoId === "empty-list") {
        return (
            <div className="flex justify-center bg-secondary items-center flex-1 h-full w-full">
                <div className="flex gap-2">
                    <VideoOff size={24} />
                    <h1 className="text-2xl">No Video</h1>
                </div>
            </div>
        )
    }

    return (
        <iframe
            className="flex-1 h-full w-full"
            src={getYoutubeVideoSrc([videoId])}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
    )
}
