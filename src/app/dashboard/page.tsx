import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ClubCard from "@/components/shared/ClubCard"
import GridLayout from "@/components/shared/GridLayout"
import { LogoutButton } from "@/components/dashboard/LogoutButton"
import CreateClubDialog from "@/components/dashboard/CreateClubDialog"
import { getClubs } from "@/actions/dashboard"
import Link from "next/link"

export default async function Dashboard() {
    const clubs = await getClubs()
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <header className="bg-white shadow-sm">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center w-1/3">
                        <Input
                            type="search"
                            placeholder="Search clubs or tracks"
                            className="w-full"
                        />
                        <Button variant="ghost" size="icon" className="ml-2">
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Bell className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Notifications</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center space-x-2"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src="/placeholder-avatar.jpg"
                                            alt="User"
                                        />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <span>User</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
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
                    <CreateClubDialog />
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
    )
}
