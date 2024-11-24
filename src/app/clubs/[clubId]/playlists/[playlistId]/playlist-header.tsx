import Image from "next/image"
import { Playlist } from "@/lib/types"
import { Calendar, Clock, Dot } from "lucide-react"
import { cn, daysSince } from "@/lib/utils"

type Props = {
    playlist: Playlist
} & React.HtmlHTMLAttributes<HTMLDivElement>

export default function PlaylistHeader({
    playlist,
    className,
    ...restProps
}: Props) {
    const daysSinceLastUpdate = daysSince(playlist.updated)
    return (
        <div className={cn("flex flex-col gap-2", className)} {...restProps}>
            <div className="flex flex-row items-end gap-4">
                <div
                    className="relative shrink-0 aspect-video h-40
                            bg-secondary rounded overflow-hidden"
                >
                    {playlist.thumbnail && (
                        <Image
                            src={playlist.thumbnail}
                            alt={playlist.name}
                            quality={50}
                            className="object-cover"
                            fill
                        />
                    )}
                    {!playlist.thumbnail && (
                        <span className="w-full h-full flex items-center justify-center text-xl font-bold text-secondary-foreground">
                            {playlist.name[0].toUpperCase()}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2 overflow-hidden">
                    <h1
                        className="text-7xl font-bold capitalize text-ellipsis
                        overflow-hidden"
                    >
                        {playlist.name}
                    </h1>
                    <p
                        className="text-gray-600 text-ellipsis
                                text-wrap overflow-hidden"
                    >
                        {playlist.description}
                    </p>
                    <div
                        className="flex items-center mt-4 gap-1 text-sm
                                text-gray-500"
                    >
                        <p className="flex text-sm text-muted-foreground">
                            Created by
                            <strong className="ml-1 capitalize">
                                {playlist.creator.username}
                            </strong>
                        </p>
                        <Dot />
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            Created on
                            <strong className="ml-1">
                                {new Date(
                                    playlist.created
                                ).toLocaleDateString()}
                            </strong>
                        </div>
                        <Dot />
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            Last updated
                            <strong className="ml-1">
                                {daysSinceLastUpdate === 0
                                    ? "today"
                                    : `${daysSinceLastUpdate} days ago`}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//export default function PlaylistHeader({ playlist }: Props) {
//    return (
//        <div className="flex flex-col gap-2">
//            <div className="flex flex-row items-center gap-2">
//                <div
//                    className="relative h-24 w-24 bg-secondary rounded-lg
//                    overflow-hidden"
//                >
//                    {playlist.thumbnail && (
//                        <Image
//                            src={playlist.thumbnail}
//                            alt={playlist.name}
//                            quality={50}
//                            fill
//                        />
//                    )}
//                </div>
//                <div className="flex flex-col gap-2">
//                    <h1 className="text-3xl font-bold">{playlist.name}</h1>
//                </div>
//            </div>
//            <div className="flex flex-col gap-2">
//                <p className="text-gray-600">{playlist.description}</p>
//                <div className="flex items-center gap-4 text-sm text-gray-500">
//                    <div className="flex items-center">
//                        <Calendar className="mr-2 h-4 w-4" />
//                        Created on{" "}
//                        {new Date(playlist.created).toLocaleDateString()}
//                    </div>
//                    <div className="flex items-center">
//                        <Clock className="mr-2 h-4 w-4" />
//                        Last updated {daysSince(playlist.updated)} days ago
//                    </div>
//                </div>
//            </div>
//        </div>
//    )
//}
