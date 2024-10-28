import React from "react"

type Props = {
    children: React.ReactNode
}
export default function GridLayout({ children }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {children}
        </div>
    )
}
