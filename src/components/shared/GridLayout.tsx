import React from "react"

type Props = {
    children: React.ReactNode
}
export default function GridLayout({ children }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {children}
        </div>
    )
}
