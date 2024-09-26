"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { socket } from "@/lib/utils"
import { Send } from "lucide-react"
import React, { useState } from "react"

type Props = {
    clubId: string
}

export default function Chat({ clubId }: Props) {
    const [message, setMessage] = React.useState<string>()
    const [chatMessages, setChatMessages] = useState<
        {
            user: {
                id: string
                username: string
                profilePic: string
            }
            message: string
        }[]
    >([])
    React.useEffect(() => {
        socket.on("new-message", (newMessage: any) => {
            setChatMessages([...chatMessages, newMessage])
        })
        return () => {
            socket.off("new-message")
        }
    })

    return (
        <div className="flex flex-col w-full h-screen relative">
            <ScrollArea className="overflow-auto flex flex-col-reverse max-h-full w-full absolute bottom-14 pb-1">
                {chatMessages.map((msg) => (
                    <div
                        key={msg.user.id + msg.message.substring(0, 6)}
                        className="flex items-start space-x-2 my-2"
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
            </ScrollArea>
            <div
                onSubmit={() => {
                    socket.emit("message", {
                        clubId,
                        message,
                    })
                }}
                className="flex space-x-2 w-[90%] absolute bottom-4 mx-auto"
            >
                <Input
                    name="message"
                    placeholder="Type your message..."
                    className="flex-grow"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <Button disabled={!message} size="icon" variant="outline">
                    <Send size="20px" />
                </Button>
            </div>
        </div>
    )
}
