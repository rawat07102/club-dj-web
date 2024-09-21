"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Plus, LogOut, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ClubCard from "@/components/shared/ClubCard"
import GridLayout from "@/components/shared/GridLayout"

export default function Dashboard() {
    const [isCreateClubOpen, setIsCreateClubOpen] = React.useState(false)
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
                                <DropdownMenuItem>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Discover Clubs</h2>
                    <Dialog
                        open={isCreateClubOpen}
                        onOpenChange={setIsCreateClubOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Club
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a New Club</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to create your new music
                                    club.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="club-name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="club-name"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="club-description"
                                        className="text-right"
                                    >
                                        Description
                                    </Label>
                                    <Input
                                        id="club-description"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Club</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                    {/*[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://picsum.photos/seed/club${i}/200/200`} />
                    <AvatarFallback>C{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">Club {i}</h3>
                    <p className="text-sm text-gray-500">1.2k members</p>
                  </div>
                </div>
                <p className="text-sm">Join us for the best electronic music experience!</p>
                <div className="flex space-x-2">
                  <Badge variant="secondary">Electronic</Badge>
                  <Badge variant="secondary">Dance</Badge>
                </div>
                <Button className="w-full">Join Club</Button>
              </div>
            ))*/}
                    <GridLayout>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <ClubCard
                                club={{
                                    id: 1,
                                    name: "Club Name",
                                    genre: "Electronic",
                                    image: `https://picsum.photos/seed/club${i}/200/200`,
                                    members: [],
                                }}
                            />
                        ))}
                    </GridLayout>
            </main>
        </div>
    )
}
