import React from "react"
import AppSidebar from "@/components/shared/app-sidebar/app-sidebar"

type Props = {
    children: React.ReactNode
}

export default async function ClubLayout({ children }: Props) {
    return (
        <div className="flex w-full">
            <AppSidebar />
            <main className="flex-1">{children}</main>
        </div>
    )
}
