import React from "react"
import AppSidebar from "@/components/shared/app-sidebar/app-sidebar"

type Props = {
    children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
    return (
        <div className="flex w-full gap-8 h-screen pr-8">
            <AppSidebar />
            <main className="flex-1 my-4">{children}</main>
        </div>
    )
}
