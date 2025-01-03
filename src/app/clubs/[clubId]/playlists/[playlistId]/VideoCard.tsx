import { getVideoById } from "@/actions/youtube"
import Image from "next/image"

type Props = {
    videoId: string
}

export default async function VideoCard({ videoId }: Props) {
    const video = await getVideoById(videoId)
    return (
        <div className="rounded-lg flex flex-col gap-2 group">
            <div className="group-hover:translate-x-1 group-hover:-translate-y-1
            transition-all aspect-video rounded-lg flex cursor-pointer
            items-center justify-center group-hover:shadow-md shadow-primary
            ease-in relative bg-gray-100"
        >
                <Image
                    src={video.thumbnails.medium.url}
                    alt={video.title}
                    quality={50}
                    fill
                />
            </div>
            <div className="flex flex-col">
                <h3 className="font-medium">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.channelTitle}</p>
            </div>
        </div>
    )
}
