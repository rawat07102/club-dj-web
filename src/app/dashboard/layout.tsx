import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Headphones, Music, Radio, Users } from "lucide-react"
import React from "react"

type Props = {
    children: React.ReactNode
}
const userContent = {
    followedPlaylists: [
        {
            id: "1",
            name: "Chill Vibes",
            creator: "ChillMaster",
            color: "bg-blue-500",
        },
        {
            id: "2",
            name: "Workout Mix",
            creator: "FitnessGuru",
            color: "bg-green-500",
        },
        {
            id: "3",
            name: "Study Session",
            creator: "BrainPower",
            color: "bg-purple-500",
        },
    ],
    followedClubs: [
        {
            id: "1",
            name: "Rock Enthusiasts",
            members: 1234,
            color: "bg-red-500",
        },
        { id: "2", name: "Jazz Lovers", members: 567, color: "bg-yellow-500" },
        { id: "3", name: "EDM Nation", members: 8901, color: "bg-pink-500" },
    ],
    myPlaylists: [
        { id: "1", name: "My Favorites", tracks: 42, color: "bg-indigo-500" },
        {
            id: "2",
            name: "Road Trip Tunes",
            tracks: 28,
            color: "bg-orange-500",
        },
    ],
    myClubs: [
        {
            id: "1",
            name: "Indie Discoveries",
            members: 89,
            color: "bg-teal-500",
        },
        {
            id: "2",
            name: "Classical Appreciation",
            members: 56,
            color: "bg-cyan-500",
        },
    ],
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold flex items-center">
                        <Music className="h-6 w-6 mr-2" />
                        Club.dj
                    </h1>
                </div>
                <ScrollArea className="h-[calc(100vh-80px)] px-4">
                    <Tabs defaultValue="followed" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="followed">Followed</TabsTrigger>
                            <TabsTrigger value="my-content">
                                My Content
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="followed">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">
                                        Playlists
                                    </h3>
                                    <ul className="space-y-2">
                                        {userContent.followedPlaylists.map(
                                            (playlist) => (
                                                <li key={playlist.id}>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full justify-start hover:bg-gray-100 transition-colors"
                                                    >
                                                        <div
                                                            className={`w-10 h-10 rounded-md mr-3 flex items-center justify-center ${playlist.color}`}
                                                        >
                                                            <Headphones className="text-white" />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="font-medium text-sm">
                                                                {playlist.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                by{" "}
                                                                {
                                                                    playlist.creator
                                                                }
                                                            </p>
                                                        </div>
                                                    </Button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">
                                        Clubs
                                    </h3>
                                    <ul className="space-y-2">
                                        {userContent.followedClubs.map(
                                            (club) => (
                                                <li key={club.id}>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full justify-start hover:bg-gray-100 transition-colors"
                                                    >
                                                        <div
                                                            className={`w-10 h-10 rounded-md mr-3 flex items-center justify-center ${club.color}`}
                                                        >
                                                            <Users className="text-white" />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="font-medium text-sm">
                                                                {club.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {club.members}{" "}
                                                                members
                                                            </p>
                                                        </div>
                                                    </Button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="my-content">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">
                                        My Playlists
                                    </h3>
                                    <ul className="space-y-2">
                                        {userContent.myPlaylists.map(
                                            (playlist) => (
                                                <li key={playlist.id}>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full justify-start hover:bg-gray-100 transition-colors"
                                                    >
                                                        <div
                                                            className={`w-10 h-10 rounded-md mr-3 flex items-center justify-center ${playlist.color}`}
                                                        >
                                                            <Radio className="text-white" />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="font-medium text-sm">
                                                                {playlist.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    playlist.tracks
                                                                }{" "}
                                                                tracks
                                                            </p>
                                                        </div>
                                                    </Button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">
                                        My Clubs
                                    </h3>
                                    <ul className="space-y-2">
                                        {userContent.myClubs.map((club) => (
                                            <li key={club.id}>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start hover:bg-gray-100 transition-colors"
                                                >
                                                    <div
                                                        className={`w-10 h-10 rounded-md mr-3 flex items-center justify-center ${club.color}`}
                                                    >
                                                        <Users className="text-white" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-medium text-sm">
                                                            {club.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {club.members}{" "}
                                                            members
                                                        </p>
                                                    </div>
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
            </aside>
            {children}
        </div>
    )
}
