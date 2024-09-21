import { Home, Music, Users, Settings } from "lucide-react"
import React from "react"

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold flex items-center">
                        <Music className="h-6 w-6 mr-2" />
                        Club.dj
                    </h1>
                </div>
                <nav className="mt-8">
                    <a
                        href="#"
                        className="flex items-center px-4 py-2 text-gray-700 bg-gray-200"
                    >
                        <Home className="h-5 w-5 mr-2" />
                        Home
                    </a>
                    <a
                        href="#"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                        <Users className="h-5 w-5 mr-2" />
                        My Clubs
                    </a>
                    <a
                        href="#"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                        <Settings className="h-5 w-5 mr-2" />
                        Settings
                    </a>
                </nav>
            </aside>
            {children}
        </div>
    )
}
