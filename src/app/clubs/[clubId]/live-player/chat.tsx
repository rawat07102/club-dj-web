"use client"
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export type Message = {
    user: {
        id: string
        username: string
        profilePic?: string
    }
    message: string
}

type Props = {
    messages: Message[]
}
export default function Chat({ messages }: Props) {
    const scrollAnchorRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        scrollAnchorRef.current?.scrollIntoView()
        document.scrollingElement?.scroll({
            top: 1,
        })
    }, [])

    return (
        <ScrollArea className="flex flex-col-reverse">
            <div
                className="flex flex-col gap-2 mb-2"
                style={{
                    overflowAnchor: "none",
                }}
            >
                {messages.map((msg) => (
                    <div
                        style={{
                            overflowAnchor: "none",
                        }}
                        key={msg.user.id + msg.message}
                        className="flex items-start space-x-2 p-1 even:bg-secondary/50"
                    >
                        <Avatar className="w-8 h-8">
                            <AvatarFallback>
                                {msg.user.username[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-blue-600">
                                {msg.user.username}
                            </p>
                            <p className="text-gray-700 text-ellipsis">
                                {msg.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div
                style={{
                    overflowAnchor: "auto",
                    height: "1px",
                }}
                ref={scrollAnchorRef}
            ></div>
        </ScrollArea>
    )
}
