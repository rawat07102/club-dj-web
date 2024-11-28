"use client"
import Image from "next/image"
import { getVideoById } from "@/actions/youtube"
import useSWR from "swr"
import { VideoOff } from "lucide-react"

type Props = {
    videoId: string | null
}

export default function LivePlayCard(props: Props) {
    const {
        data: video,
        isLoading,
        error,
    } = useSWR(props.videoId ?? props.videoId, getVideoById)

    if (isLoading) {
        return <div>loading video ....</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <div
                className="relative shrink-0 flex justify-center items-center
                aspect-video w-80 bg-secondary rounded overflow-hidden"
            >
                {video ? (
                    <Image
                        src={video.thumbnails.medium.url}
                        alt={video.title}
                        quality={50}
                        className="object-cover"
                        fill
                    />
                ) : (
                    <div className="flex flex-col items-center">
                        <VideoOff />
                        <span className="text-secondary-foreground text-xs">
                            Nothing playing
                        </span>
                    </div>
                )}
            </div>
            <div>
                <span>{video?.title || ""}</span>
                <span>{video?.channelTitle || ""}</span>
            </div>
        </div>
    )
}
