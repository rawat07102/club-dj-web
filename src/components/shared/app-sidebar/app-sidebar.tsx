import Image from "next/image"
import { Library, Music } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import AppSidebarTrigger from "./app-sidebar-trigger"
import Link from "next/link"
import { getUser } from "@/actions/user"
import CreateClub from "../create-club"
import DeleteClub from "@/app/clubs/[clubId]/delete-club"

export default async function AppSidebar() {
    const user = await getUser()

    return (
        <Sidebar collapsible="icon">
            <div className="w-full py-2 flex justify-end bg-background">
                <AppSidebarTrigger />
            </div>
            <SidebarContent className="bg-background">
                <SidebarHeader className="ml-2">
                    <Link
                        href="/"
                        className="transition-colors ease-in bg-primary
                        [&>svg]:stroke-primary-foreground p-2 max-w-fit
                        rounded-full [&>svg]:hover:stroke-primary
                        hover:bg-primary-foreground"
                    >
                        <Music />
                    </Link>
                </SidebarHeader>
                <SidebarGroup className="flex flex-col gap-4">
                    <SidebarGroupLabel
                        className="flex pl-1 gap-2 text-xl text-back
                        [&>svg]:size-6 "
                    >
                        <Library />
                        Your Library
                        <CreateClub className="ml-auto" />
                    </SidebarGroupLabel>
                    <SidebarGroupContent
                        className="flex pl-1 flex-col gap-2
                        overflow-hidden"
                    >
                        {user.clubs.map((club) => (
                            <div className="flex" key={club.id}>
                                <Link
                                    href={`/clubs/${club.id}`}
                                    className="relative flex min-w-max gap-1
                                    items-center w-full justify-start
                                    transition-colors group/item p-1"
                                >
                                    <div
                                        className="absolute border w-full
                                        h-full bg-primary opacity-0
                                        pointer-events-none
                                        group-hover/item:opacity-20 z-50
                                        top-0 left-0 rounded transition ease-in"
                                    ></div>
                                    <div
                                        className="relative aspect-square w-10
                                        rounded flex items-center
                                        justify-center overflow-hidden"
                                    >
                                        {club.thumbnail ? (
                                            <Image
                                                alt={club.name}
                                                src={
                                                    club.thumbnail ||
                                                    "https://placehold.co/400"
                                                }
                                                className="object-cover"
                                                fill
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex
                                                    items-center justify-center
                                                    text-secondary-foreground
                                                    bg-secondary"
                                            >
                                                {club.name[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text">
                                            {club.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {`${club.followersCount} followers`}
                                        </p>
                                    </div>
                                </Link>
                                <div className="flex ml-auto items-center">
                                    <DeleteClub clubId={club.id} />
                                </div>
                            </div>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
