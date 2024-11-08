import { getVideoById } from "@/actions/clubs"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Props = {
    videoId: string
    highlight?: boolean
}

export default async function QueueCard({ videoId, highlight }: Props) {
    const video = await getVideoById(videoId)
    const { snippet } = video
    return (
        <div
            className={cn("flex items-center space-x-2 w-full p-1", {
                "bg-primary/20": highlight,
            })}
        >
            <div className="relative aspect-video flex-shrink-0
                bg-gray-100 flex items-center w-32 justify-center text-gray-600
                font-semibold rounded">
                <Image
                    src={snippet.thumbnails.medium.url}
                    alt={snippet.title}
                    fill
                />
            </div>
            <div className="flex-1 flex flex-col">
                <p className="text-sm font-medium text-foreground text-ellipsis overflow-hidden">{snippet.title}</p>
                <p className="text-xs text-foreground/80">{snippet.channelTitle}</p>
            </div>
        </div>
    )
}
