import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Chat from "./chat"
import Queue from "./queue"
import { fetchClubById } from "@/actions/clubs"
import Player from "./player"

type Props = {
    params: {
        clubId: string
    }
}

export default async function ClubPage({ params: { clubId } }: Props) {
    const club = await fetchClubById(clubId)
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <main className="flex w-full h-full max-h-screen">
                <div className="w-full">
                    <Player queue={club.queue} clubId={clubId} />
                </div>
                <Tabs
                    defaultValue="chat"
                    className="relative max-w-sm w-full bg-white overflow-hidden"
                >
                    <TabsList className="absolute grid w-full grid-cols-2 top-0 z-50">
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                        <TabsTrigger value="queue">Up Next</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="pl-4 pr-1">
                        <Chat clubId={clubId} />
                    </TabsContent>
                    <TabsContent value="queue" className="px-4">
                        <Queue clubId={club.id} queue={club.queue} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
