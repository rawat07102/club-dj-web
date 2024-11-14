"use client"

import { PanelLeftClose } from "lucide-react"
import React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type Props = {} & React.HtmlHTMLAttributes<HTMLButtonElement>

export default function AppSidebarTrigger({ className, ...props }: Props) {
    const { toggleSidebar, open } = useSidebar()
    return (
        <button
            className={cn("hover:bg-accent transition-all mr-3 p-2 ease-in", {
                "rotate-180": !open,
            })}
            onClick={toggleSidebar}
            {...props}
        >
            <PanelLeftClose />
        </button>
    )
}
