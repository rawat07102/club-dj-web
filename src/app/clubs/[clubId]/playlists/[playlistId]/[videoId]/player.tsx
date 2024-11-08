"use client"

import { getYoutubeVideoSrc } from "@/lib/utils"
import React from "react"

type Props = {
    videoId: string
}

export default function Player({ videoId }: Props) {
    return (
        <iframe
            className="flex-1 h-full w-full"
            src={getYoutubeVideoSrc([videoId])}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
    )
}
