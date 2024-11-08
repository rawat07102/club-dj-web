import MediaList from "@/components/dashboard/MediaList"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUser } from "@/actions/dashboard"
import { Music } from "lucide-react"
import React from "react"
import Link from "next/link"

type Props = {
    children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
    const user = await getUser()
    return (
        <div className="flex gap-8 h-screen pr-8">
            {/* Sidebar */}
            <aside className="w-64 shadow-md">
                <div className="p-4">
                    <Link href="/dashboard">
                        <h1 className="text-2xl font-bold flex items-center">
                            <Music className="h-6 w-6 mr-2" />
                            Club.dj
                        </h1>
                    </Link>
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
                                        Clubs
                                    </h3>
                                    <MediaList></MediaList>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="my-content">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">
                                        My Clubs
                                    </h3>
                                    <ul className="space-y-2">
                                        {user.clubs.map((club) => (
                                            <li key={club.id}>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-md mr-3 flex items-center justify-center overflow-hidden">
                                                        <img
                                                            src={
                                                                club.thumbnail ||
                                                                "https://placehold.co/400"
                                                            }
                                                        />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-medium text-sm">
                                                            {club.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {`${club.followersCount} followers`}
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
            <main className="flex-1 my-4">{children}</main>
        </div>
    )
}
