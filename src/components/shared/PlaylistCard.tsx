import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Music, Play, Heart } from "lucide-react"

type Props = {
    playlist: {
        id: number
        image: string
        title: string
        videos: string[]
        likes: number
        creator: string
    }
}

export default function PlaylistCard({ playlist }: Props) {
    return (
        <Card key={playlist.id} className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="aspect-square relative">
                    <img
                        src={playlist.image}
                        alt={playlist.title}
                        className="object-cover w-full h-full"
                    />
                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-2 right-2 rounded-full"
                    >
                        <Play className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-sm truncate">
                    {playlist.title}
                </CardTitle>
                <p className="text-xs text-gray-500 truncate">
                    by {playlist.creator}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Music className="h-3 w-3" />
                    <span>{playlist.videos}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Heart className="h-3 w-3" />
                    <span>{playlist.likes}</span>
                </div>
            </CardFooter>
        </Card>
    )
}
