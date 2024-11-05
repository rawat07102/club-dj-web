import Image from "next/image"
import { fetchPlaylistById } from "@/actions/clubs"
import { Calendar, Clock } from "lucide-react"
import QueueCard from "@/app/clubs/[clubId]/player/queue-card"

type Props = {
    params: {
        playlistId: string
    }
}

export default async function PlaylistPage({ params: { playlistId } }: Props) {
    const playlist = await fetchPlaylistById(playlistId)

    const daysSinceLastUpdate = Math.floor(
        (new Date().getTime() - new Date(playlist.updated).getTime()) /
            (1000 * 3600 * 24)
    )

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <div className="relative h-24 w-24 bg-secondary rounded-lg overflow-hidden">
                        {playlist.thumbnail && (
                            <Image
                                src={playlist.thumbnail}
                                alt={playlist.name}
                                quality={50}
                                fill
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">{playlist.name}</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-600">{playlist.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            Created on{" "}
                            {new Date(playlist.created).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            Last updated {daysSinceLastUpdate} days ago
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-medium">Videos</h2>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {playlist.list?.map((videoId) => (
                        <QueueCard key={videoId} videoId={videoId} />
                    ))}
                </div>
            </div>
        </div>
    )
}
