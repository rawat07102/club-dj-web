"use client"
import { Button } from "../ui/button"
import Image from "next/image"
import { Input } from "../ui/input"
import { SearchIcon, Users } from "lucide-react"
import React from "react"
import { Popover, PopoverContent } from "../ui/popover"
import { Anchor } from "@radix-ui/react-popover"
import useSWRMutation from "swr/mutation"
import { getClubs } from "@/actions/dashboard"
import Link from "next/link"

const DELAY = 500

type Props = {}

async function fetchSearchClubs(_url: unknown, { arg }: { arg: string }) {
    return getClubs({ searchQuery: arg, take: 3 })
}

export default function SearchClubsForm({}: Props) {
    const [searchQuery, setSearchQuery] = React.useState<string>("")
    const {
        trigger,
        data: clubs,
        isMutating,
    } = useSWRMutation("search-clubs", fetchSearchClubs)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            trigger(searchQuery)
        }, DELAY)

        return () => {
            clearTimeout(timer)
        }
    }, [searchQuery])

    const [showOptions, setShowOptions] = React.useState(false)

    async function onQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newQuery = e.target.value
        setSearchQuery(newQuery)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex relative flex-col justify-stretch w-full gap-1"
        >
            <div className="flex w-full flex-wrap gap-2">
                <Input
                    value={searchQuery}
                    onChange={onQueryChange}
                    onFocus={() => setShowOptions(true)}
                    className="flex-1 outline-none"
                />
                <Button size="icon">
                    <SearchIcon size={16} />
                </Button>
            </div>
            <Popover
                open={showOptions}
                onOpenChange={(open) => setShowOptions(open)}
            >
                <Anchor></Anchor>
                <PopoverContent
                    align="start"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="max-h-72 overflow-y-auto"
                >
                    <div className="flex flex-col gap-2">
                        {!isMutating &&
                            clubs &&
                            clubs.length > 0 &&
                            clubs.map((club) => (
                                <Link
                                    href={`/clubs/${club.id}`}
                                    key={club.id}
                                    className="flex w-full transition-colors gap-1 items-center hover:bg-accent hover:text-accent-foreground cursor-default rounded-sm"
                                >
                                    <div className="relative h-[50px] w-[50px] bg-secondary overflow-hidden rounded-md">
                                        {club.thumbnail ? (
                                            <Image
                                                src={club.thumbnail}
                                                alt={club.name}
                                                quality={20}
                                                height={50}
                                                width={50}
                                            />
                                        ) : (
                                            <span className="w-full h-full flex items-center justify-center text-accent-foreground font-semibold">
                                                {club.name
                                                    .toUpperCase()
                                                    .charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <span className="font-semibold w-full">
                                            {club.name}
                                        </span>
                                        <span className="flex items-center gap-1 text-opacity-90 text-xs">
                                            <Users size={12} />
                                            {club.followersCount}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        {!isMutating && clubs && clubs.length === 0 && (
                            <div className="flex justify-center items-center">
                                No clubs found.
                            </div>
                        )}
                        {isMutating && (
                            <>
                                <div className="rounded-md h-10 bg-accent animate-pulse w-full"></div>
                                <div className="rounded-md h-10 bg-accent animate-pulse w-full"></div>
                                <div className="rounded-md h-10 bg-accent animate-pulse w-full"></div>
                            </>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </form>
    )
}
