"use client"

import { getAuthToken } from "@/actions/user"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { socket } from "@/lib/utils"
import { Send } from "lucide-react"
import React from "react"

type Props = {
    clubId: string
}

export default function Chat({ clubId }: Props) {
    const [message, setMessage] = React.useState<string>("")
    const [chatMessages, setChatMessages] = React.useState<
        {
            user: {
                id: string
                username: string
                profilePic: string
            }
            message: string
        }[]
    >([])
    const scrollAnchorRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        scrollAnchorRef.current?.scrollIntoView()
        document.scrollingElement?.scroll({
            top: 1,
        })
    }, [])

    function onNewMessage(newMessage: any) {
        setChatMessages([...chatMessages, newMessage])
    }

    React.useEffect(() => {
        async function socketConnection() {
            const accessToken = await getAuthToken()
            socket.auth = {
                accessToken,
            }
            socket.connect()
        }

        if (!socket.connected) {
            socketConnection()
        }

        socket.on("connect", () => {
            console.log(`connected with id ${socket.id}`)
            socket.emit("join-room", clubId, (message: string) => {
                console.log(message)
            })
        })

        return () => {
            socket.emit("leave-room", clubId)
            socket.disconnect()
        }
    }, [])

    React.useEffect(() => {
        socket.on("new-message", onNewMessage)
        return () => {
            socket.off("new-message")
        }
    }, [socket, chatMessages])

    return (
        <div className="relative flex flex-col justify-end w-full h-screen ">
            <ScrollArea className="flex flex-col-reverse mt-2">
                <div
                    className="flex flex-col px-2"
                    style={{
                        overflowAnchor: "none",
                    }}
                >
                    {chatMessages.map((msg) => (
                        <div
                            style={{
                                overflowAnchor: "none",
                            }}
                            key={msg.user.id + msg.message}
                            className="flex items-start space-x-2 my-8"
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
            <form className="flex z-50 space-x-2 w-[90%] mx-auto pb-2">
                <Input
                    placeholder="Type your message..."
                    className="flex-grow"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        socket.emit("message", {
                            clubId,
                            message,
                        })
                        setMessage("")
                    }}
                    disabled={!message}
                >
                    <Send size="20px" />
                </Button>
            </form>
        </div>
    )
}
