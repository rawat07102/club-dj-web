import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ClubCard from "@/components/shared/ClubCard"
import GridLayout from "@/components/shared/GridLayout"
import LogoutButton from "@/components/shared/logout-button"
import { getClubs } from "@/actions/clubs"
import Link from "next/link"
import AppSidebar from "@/components/shared/app-sidebar/app-sidebar"
import { getUser } from "@/actions/user"
import SearchClubsForm from "@/components/shared/SearchClubsForm"

export default async function HomePage() {
    const clubs = await getClubs()
    const user = await getUser()
    return (
        <main className="flex gap-4 w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <SearchClubsForm />
                        <div className="flex items-center space-x-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center space-x-2"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={user.profilePic}
                                                alt="User profile pic"
                                            />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <span>{user.username}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <LogoutButton />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Discover Clubs</h2>
                    </div>
                    <GridLayout>
                        {clubs.map((club) => (
                            <Link key={club.id} href={`/clubs/${club.id}`}>
                                <ClubCard club={club} />
                            </Link>
                        ))}
                    </GridLayout>
                </main>
            </div>
        </main>
    )
}
