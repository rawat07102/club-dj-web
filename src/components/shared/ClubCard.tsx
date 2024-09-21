import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Users } from "lucide-react"
import { Badge } from "../ui/badge"

type Props = {
    club: {
        id: number,
        name: string,
        image: string,
        members: string[],
        genre: string
    }
}

export default function ClubCard({ club }: Props) {
    return (
        <Card key={club.id} className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="aspect-square relative">
                    <img
                        src={club.image}
                        alt={club.name}
                        className="object-cover w-full h-full"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-sm truncate">{club.name}</CardTitle>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>{club.members}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Badge variant="secondary" className="w-full justify-center">
                    {club.genre}
                </Badge>
            </CardFooter>
        </Card>
    )
}
