import { Button } from "@/components/ui/button"
import React from "react"

type MediaListProps = {
    children?: React.ReactNode
}

export default function MediaList({ children }: MediaListProps) {
    return <ul className="space-y-2">{children}</ul>
}

type MediaListItemProps = {
    children?: React.ReactNode
}

export function MediaListItem({ children }: MediaListItemProps) {
    return (
        <li>
            <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100 transition-colors"
            >
                {children}
            </Button>
        </li>
    )
}
