"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Music, Play, Users, Search } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically make an API call to search for clubs, playlists, or users
        console.log("Searching for:", searchQuery)
    }

    return (
        <div className="flex flex-col min-h-screen items-center">
            <header className="px-4 lg:px-6 h-20 flex items-center w-full">
                <Link className="flex items-center justify-center" href="/">
                    <Music className="h-6 w-6 mr-2" />
                    <span className="font-bold">Club.dj</span>
                </Link>
                <div className="ml-auto flex items-center space-x-4">
                    <form onSubmit={handleSearch} className="relative">
                        <Input
                            type="search"
                            placeholder="Search clubs, playlists, or users"
                            className="w-full md:w-[300px] pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </form>
                    <nav className="hidden md:flex space-x-4">
                        <Link
                            className="text-sm font-medium hover:underline underline-offset-4"
                            href="#features"
                        >
                            Features
                        </Link>
                        <Link
                            className="text-sm font-medium hover:underline underline-offset-4"
                            href="#trending"
                        >
                            Trending
                        </Link>
                        <Link
                            className="text-sm font-medium hover:underline underline-offset-4"
                            href="/auth/login"
                        >
                            Log in
                        </Link>
                        <Link
                            className="text-sm font-medium hover:underline underline-offset-4"
                            href="/auth/signup"
                        >
                            Sign up
                        </Link>
                    </nav>
                    <Button className="md:hidden" variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </header>
            <main className="flex-1 w-full">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                                    Welcome to Club.dj
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-400">
                                    Join the ultimate music community. Create or
                                    join clubs, share your favorite tracks, and
                                    discover new music with friends.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/auth/signup">
                                    <Button size="lg">Get Started</Button>
                                </Link>
                                <Link href="/auth/login">
                                    <Button
                                        variant="outline"
                                        className="text-accent"
                                        size="lg"
                                    >
                                        Log In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="features"
                    className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
                >
                    <div className=" px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create Music Clubs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Start your own music community and connect
                                    with like-minded fans.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Discover New Music</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Explore curated playlists and
                                    recommendations from other music
                                    enthusiasts.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Live Listening Sessions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Join real-time listening parties and discuss
                                    music with club members.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section
                    id="trending"
                    className="w-full py-12 md:py-24 lg:py-32"
                >
                    <div className=" px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Trending Now
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Hot Clubs
                                </h3>
                                <div className="grid gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <Card key={`club-${i}`}>
                                            <CardHeader>
                                                <div className="flex items-center space-x-4">
                                                    <Avatar>
                                                        <AvatarImage
                                                            src={`https://picsum.photos/seed/club${i}/200/200`}
                                                        />
                                                        <AvatarFallback>
                                                            C{i}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle>
                                                            Club {i}
                                                        </CardTitle>
                                                        <CardDescription>
                                                            {1000 + i * 100}{" "}
                                                            members
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm">
                                                    Join us for the best music
                                                    experience!
                                                </p>
                                            </CardContent>
                                            <CardFooter>
                                                <div className="flex space-x-2">
                                                    <Badge variant="secondary">
                                                        Electronic
                                                    </Badge>
                                                    <Badge variant="secondary">
                                                        Pop
                                                    </Badge>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Top Playlists
                                </h3>
                                <div className="grid gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <Card key={`playlist-${i}`}>
                                            <CardHeader>
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                                                        <Play className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <CardTitle>
                                                            Awesome Mix Vol. {i}
                                                        </CardTitle>
                                                        <CardDescription>
                                                            Created by User{i}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm">
                                                    A mix of the hottest tracks
                                                    right now!
                                                </p>
                                            </CardContent>
                                            <CardFooter>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                    <Music className="h-4 w-4" />
                                                    <span>{10 + i} tracks</span>
                                                    <Users className="h-4 w-4 ml-2" />
                                                    <span>
                                                        {100 * i} listeners
                                                    </span>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
                    <div className=" px-4 md:px-6 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
                            Ready to join the party?
                        </h2>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-8">
                            Sign up now and start exploring the world of music
                            with MusicClub. It's free and only takes a minute!
                        </p>
                        <Link href="/signup">
                            <Button size="lg">Sign Up Now</Button>
                        </Link>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500">
                    © 2023 MusicClub. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}
