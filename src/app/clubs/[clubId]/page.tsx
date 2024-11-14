import { fetchClubById, isClubCreator } from "@/actions/clubs"
import Image from "next/image"
import Link from "next/link"
import CreatePlaylist from "./playlists/[playlistId]/create-playlist"
import EditableHeader from "./editable-header"
import ClubHeader from "./club-header"
import DeletePlaylist from "./delete-playlist"
import AppSidebar from "@/components/shared/app-sidebar/app-sidebar"

type Props = {
    params: Promise<{
        clubId: string
    }>
}

export default async function ClubPage(props: Props) {
    const params = await props.params

    const { clubId } = params

    const club = await fetchClubById(clubId)
    const allowEdit = await isClubCreator(club.creatorId)
    return (
        <div className="flex w-full gap-8">
            <AppSidebar />
            <div className="flex flex-1 flex-col gap-8 pt-8">
                {allowEdit ? (
                    <EditableHeader club={club} />
                ) : (
                    <ClubHeader club={club} />
                )}

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-medium">Playlists</h2>
                        <CreatePlaylist
                            playlistCount={club.playlists.length}
                            clubId={club.id}
                        />
                    </div>
                    <div
                        className="grid gap-4 grid-cols-1 sm:grid-cols-2
                    md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                    2xl:grid-cols-6"
                    >
                        {club.playlists.map((playlist) => (
                            <div
                                key={playlist.id}
                                className="rounded-lg flex flex-col gap-2"
                            >
                                <Link
                                    href={getUrl(
                                        clubId,
                                        playlist.id,
                                        playlist.list
                                    )}
                                    className="aspect-video rounded flex
                                cursor-pointer items-center justify-center
                                hover:shadow-primary/20 hover:shadow-md ease-in
                                transition-all relative bg-gray-100
                                hover:translate-x-1
                                hover:-translate-y-1 "
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
                                        <div
                                            className="text-2xl font-serif px-4
                                        py-2 bg-gray-200 rounded-full"
                                        >
                                            {playlist.name[0].toUpperCase()}
                                        </div>
                                    )}
                                </Link>
                                <div className="flex justify-between px-1">
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
                                    <div>
                                        <DeletePlaylist
                                            clubId={clubId}
                                            playlist={playlist}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function getUrl(clubId: string, playlistId: string, list?: string[]) {
    return `${clubId}/playlists/${playlistId}/${list ? list[0] : "empty-list"}`
}
