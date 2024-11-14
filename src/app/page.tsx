import SearchClubsForm from "@/components/shared/SearchClubsForm"
import { Button } from "@/components/ui/button"
import { Music, Users, Headphones, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b w-full from-blue-100 to-white">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Music className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">
                            MusicClub
                        </span>
                    </div>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    href="/auth/login"
                                    className="text-gray-600 hover:text-blue-600"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/auth/signup"
                                    className="text-gray-600 hover:text-blue-600"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Join the Ultimate Music Experience
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Connect with music lovers, discover new tracks, and
                        enjoy live sessions with friends.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Button asChild size="lg" className="w-full sm:w-auto">
                            <Link href="/auth/signup">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                    </div>
                    <div className="mt-8 max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-2">
                            Search Clubs
                        </h2>
                        <SearchClubsForm />
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            Join Music Clubs
                        </h2>
                        <p className="text-gray-600">
                            Connect with like-minded music enthusiasts and share
                            your passion.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <Headphones className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            Live Listening Sessions
                        </h2>
                        <p className="text-gray-600">
                            Enjoy music together in real-time with friends and
                            new connections.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <Music className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            Discover New Tracks
                        </h2>
                        <p className="text-gray-600">
                            Explore a wide range of music and expand your
                            musical horizons.
                        </p>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-100 mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Music className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold text-blue-600">
                                MusicClub
                            </span>
                        </div>
                        <nav>
                            <ul className="flex space-x-4">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        Terms
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        Privacy
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="mt-4 text-center text-gray-500 text-sm">
                        © 2023 MusicClub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
