import { getPlaylistById, isPlaylistCreator } from "@/actions/playlists"
import AddVideo from "./add-video"
import Link from "next/link"
import VideoCard from "./VideoCard"
import PlaylistHeader from "./playlist-header"
import EditablePlaylistHeader from "./editable-playlist-header"

// TODO: update editPlaylist action

type Props = {
    params: Promise<{
        playlistId: string
        clubId: string
    }>
}

export default async function PlaylistPage(props: Props) {
    const params = await props.params

    const { playlistId } = params

    const playlist = await getPlaylistById(playlistId)
    const allowEdit = await isPlaylistCreator(playlist.creatorId)
    return (
        <div className="flex flex-1 flex-col gap-8 ml-4 mt-4">
            {allowEdit ? (
                <EditablePlaylistHeader playlist={playlist} />
            ) : (
                <PlaylistHeader playlist={playlist} />
            )}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-8">
                    <h2 className="text-xl font-medium">Videos</h2>
                    <div>
                        <AddVideo playlistId={playlistId} />
                    </div>
                </div>
                <div
                    className="grid gap-4 grid-cols-1 sm:grid-cols-2
                    md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
                >
                    {playlist.list?.map((videoId) => (
                        <Link
                            key={videoId}
                            href={`${playlistId}/player?startingVideo=${videoId}`}
                        >
                            <VideoCard videoId={videoId} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
