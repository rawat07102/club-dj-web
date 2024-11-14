import Image from "next/image"
import { Club } from "@/lib/types"
import { Calendar, Clock, Dot } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"

type Props = {
    club: Club
    className?: ClassValue
} & React.HtmlHTMLAttributes<HTMLDivElement>

export default function ClubHeader({ club, className, ...restProps }: Props) {
    const daysSinceLastUpdate = Math.floor(
        (new Date().getTime() - new Date(club.updated).getTime()) /
            (1000 * 3600 * 24)
    )
    return (
        <div className={cn("flex flex-col gap-2", className)} {...restProps}>
            <div className="flex flex-row items-end gap-4">
                <div
                    className="relative shrink-0 aspect-square w-52
                            bg-secondary rounded overflow-hidden"
                >
                    {club.thumbnail && (
                        <Image
                            src={club.thumbnail}
                            alt={club.name}
                            quality={50}
                            className="object-cover"
                            fill
                        />
                    )}
                </div>
                <div className="flex flex-col gap-2 overflow-hidden">
                    <h1
                        className="text-7xl font-bold capitalize text-ellipsis
                        overflow-hidden"
                    >
                        {club.name}
                    </h1>
                    <p
                        className="text-gray-600 text-ellipsis
                                text-wrap overflow-hidden"
                    >
                        {club.description}
                    </p>
                    <div
                        className="flex items-center mt-4 gap-1 text-sm
                                text-gray-500"
                    >
                        <p className="flex text-sm text-muted-foreground">
                            Created by
                            <strong className="ml-1 capitalize">
                                {club.creator.username}
                            </strong>
                        </p>
                        <Dot />
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            Created on
                            <strong className="ml-1">
                                {new Date(club.created).toLocaleDateString()}
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
                    <div className="flex mt-2 flex-wrap gap-2">
                        {club.genres.map((genre) => (
                            <Badge key={genre.id} variant="secondary">
                                {genre.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2"></div>
        </div>
    )
}
