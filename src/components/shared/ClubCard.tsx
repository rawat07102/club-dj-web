import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Club } from "@/lib/types"
import { Users } from "lucide-react"

type Props = {
    club: Club
}

export default function ClubCard({ club }: Props) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="aspect-square relative">
                    <img
                        src={club.thumbnail || "https://placehold.co/400"}
                        alt={club.name}
                        className="object-cover w-full h-full"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-sm truncate">{club.name}</CardTitle>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>{club.followersCount}</span>
                </div>
            </CardContent>
        </Card>
    )
}
