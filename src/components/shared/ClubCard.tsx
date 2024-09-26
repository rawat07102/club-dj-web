import { Club } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Users } from "lucide-react"
import Image from "next/image"

type Props = {
    club: Club
}

export default function ClubCard({ club }: Props) {
    console.log(club.thumbnail)
    return (
        <Card className="overflow-hidden cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader className="p-0">
                <div className="aspect-square flex items-center justify-center relative bg-gray-100">
                    {club.thumbnail ? (
                        <Image
                            src={club.thumbnail}
                            alt={club.name}
                            className="object-cover w-full h-full"
                            fill
                        />
                    ) : (
                        <div className="text-2xl font-serif px-4 py-2 bg-gray-200 rounded-full">
                            {club.name[0].toUpperCase()}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex">
                    <CardTitle className="text-base truncate flex-1">
                        {club.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users size={18} />
                        <span>{club.followersCount}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
