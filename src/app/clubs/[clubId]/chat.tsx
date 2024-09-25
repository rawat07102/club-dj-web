import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { useState } from "react"

export default function Chat() {
    const [chatMessages, setChatMessages] = useState([
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        { id: 3, user: "Charlie", message: "Can't wait for the next track!" },
        { id: 1, user: "Alice", message: "Hey everyone!" },
        { id: 2, user: "Bob", message: "This song is awesome!" },
        {
            id: 3,
            user: "Charlie",
            message:
                "Can't wait for the next track!Can't wait for the next track!Can't wait for the next track!Can't wait for the next track!",
        },
    ])

    return (
        <div className="flex flex-col w-full h-screen relative">
            <ScrollArea className="overflow-auto flex flex-col-reverse max-h-full w-full absolute bottom-14 pb-1">
                {chatMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className="flex items-start space-x-2 my-2"
                    >
                        <Avatar className="w-8 h-8">
                            <AvatarFallback>{msg.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-blue-600">
                                {msg.user}
                            </p>
                            <p className="text-gray-700 text-ellipsis">
                                {msg.message}
                            </p>
                        </div>
                    </div>
                ))}
            </ScrollArea>
            <form
                onSubmit={() => {}}
                className="flex space-x-2 w-[90%] absolute bottom-4 mx-auto"
            >
                <Input
                    name="message"
                    placeholder="Type your message..."
                    className="flex-grow"
                />
                <Button type="submit" size="icon" variant="outline">
                    <Send size="20px" />
                </Button>
            </form>
        </div>
    )
}
