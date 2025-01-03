import { Club } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"

type Props = {
    club: Club
}

export default function ClubCard({ club }: Props) {
    return (
        <Card className="overflow-hidden cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader className="p-0">
                <div className="aspect-video flex items-center justify-center relative bg-gray-100">
                    {club.thumbnail ? (
                        <Image
                            src={club.thumbnail}
                            alt={club.name}
                            className="object-cover w-full h-full"
                            quality={50}
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
                </div>
            </CardContent>
        </Card>
    )
}
