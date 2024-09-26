"use client"

import { Club } from "@/lib/types"
import { getYoutubeVideoSrc } from "@/lib/utils"
import React from "react"

type Props = {
    clubId: string
    queue: Club["queue"]
}

export default function Player({ clubId, queue }: Props) {
    return (
        <iframe
            className="flex-1 h-full w-full"
            src={getYoutubeVideoSrc(queue)}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
    )
}
