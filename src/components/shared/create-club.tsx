"use client"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import React from "react"
import { createClub } from "@/actions/clubs"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

type Props = React.HtmlHTMLAttributes<HTMLButtonElement>

export default function CreateClub({className, ...props}: Props) {
    const router = useRouter()

    async function handleClick() {
        const clubId = await createClub()
        router.push(`/clubs/${clubId}`)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className={cn("rounded-full [&_svg]:size-6", className)}
            title="Create Club"
            {...props}
        >
            <Plus size={24} />
        </Button>
    )
}
