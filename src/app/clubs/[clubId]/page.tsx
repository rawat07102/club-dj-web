import { fetchClubById } from "@/actions/clubs"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import CreatePlaylist from "./playlists/[playlistId]/create-playlist"

type Props = {
    params: {
        clubId: string
    }
}

export default async function ClubPage({ params: { clubId } }: Props) {
    const club = await fetchClubById(clubId)
    const daysSinceLastUpdate = Math.floor(
        (new Date().getTime() - new Date(club.updated).getTime()) /
            (1000 * 3600 * 24)
    )

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <div className="relative h-24 w-24 bg-secondary rounded-lg overflow-hidden">
                        {club.thumbnail && (
                            <Image
                                src={club.thumbnail}
                                alt={club.name}
                                quality={50}
                                fill
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold">{club.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            Created by {club.creator.username}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-600">{club.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {club.genres.map((genre) => (
                            <Badge key={genre.id} variant="secondary">
                                {genre.name}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            Created on{" "}
                            {new Date(club.created).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            Last updated {daysSinceLastUpdate} days ago
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-medium">Playlists</h2>
                    <CreatePlaylist
                        playlistCount={club.playlists.length}
                        clubId={club.id}
                    />
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {club.playlists.map((playlist) => (
                        <div className="rounded-lg flex flex-col gap-2">
                            <Link
                                href={`${clubId}/playlist/${playlist.id}/player`}
                                className="aspect-video rounded-lg flex cursor-pointer items-center justify-center hover:shadow-primary/20 hover:shadow ease-in transition-shadow relative bg-gray-100"
                            >
                                {playlist.thumbnail ? (
                                    <Image
                                        src={playlist.thumbnail}
                                        alt={playlist.name}
                                        quality={50}
                                        height={200}
                                        width={250}
                                        className="rounded-lg"
                                    />
                                ) : (
                                    <div className="text-2xl font-serif px-4 py-2 bg-gray-200 rounded-full">
                                        {playlist.name[0].toUpperCase()}
                                    </div>
                                )}
                            </Link>
                            <div>
                                <Link
                                    key={playlist.id}
                                    href={`${clubId}/playlists/${playlist.id}`}
                                    className="hover:underline"
                                >
                                    <h3 className="font-medium">
                                        {playlist.name}
                                    </h3>
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                    {playlist.list?.length ?? 0} videos
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
