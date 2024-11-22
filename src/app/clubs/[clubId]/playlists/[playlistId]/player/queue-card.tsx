"use client"
import { getVideoById } from "@/actions/clubs"
import { cn } from "@/lib/utils"
import Image from "next/image"
import useSWR from "swr"

type Props = {
    videoId: string
    highlight?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function QueueCard({
    videoId,
    highlight,
    className,
    ...props
}: Props) {
    const { data: video, isLoading, error } = useSWR(videoId, getVideoById)

    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div></div>
    }

    if (!video) {
        return <div>No Video found</div>
    }

    return (
        <div
            className={cn(
                "flex items-center space-x-2 w-full p-1",
                {
                    "bg-primary/20": highlight,
                },
                className
            )}
            {...props}
        >
            <div
                className="relative aspect-video flex-shrink-0
                bg-gray-100 flex items-center w-32 justify-center text-gray-600
                font-semibold rounded"
            >
                <Image
                    src={video.thumbnails.medium.url}
                    alt={video.title}
                    fill
                />
            </div>
            <div className="flex-1 flex flex-col">
                <p className="text-sm font-medium text-foreground text-ellipsis overflow-hidden">
                    {video.title}
                </p>
                <p className="text-xs text-foreground/80">
                    {video.channelTitle}
                </p>
            </div>
        </div>
    )
}
