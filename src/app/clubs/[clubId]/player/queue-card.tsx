import { getVideoById } from "@/actions/clubs"
import Image from "next/image"

type Props = {
    videoId: string
}

export default async function QueueCard({ videoId }: Props) {
    const video = await getVideoById(videoId)
    const { snippet } = video
    return (
        <div className="flex items-center space-x-2 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-600 font-semibold rounded overflow-hidden">
                <Image
                    src={snippet.thumbnails.medium.url}
                    alt={snippet.title}
                    height={48}
                    width={48}
                />
            </div>
            <div>
                <p className="font-medium text-gray-800">{snippet.title}</p>
                <p className="text-sm text-gray-600">{snippet.channelTitle}</p>
            </div>
        </div>
    )
}
