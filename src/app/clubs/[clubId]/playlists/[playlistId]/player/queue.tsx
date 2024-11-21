import { ScrollArea } from "@/components/ui/scroll-area"
import { Club } from "@/lib/types"
import QueueCard from "./queue-card"
import Link from "next/link"

type Props = {
    queue: Club["queue"]
    videoId: string
}

export default function Queue({ queue, videoId }: Props) {
    return (
        <ScrollArea className="w-full h-screen">
            <div className="flex flex-col mt-10 gap-2 py-2">
                {queue &&
                    queue.map((id) => (
                        <Link href={`${id}`} key={id} className="hover:shadow-md hover:bg-primary/10 ease-in transition-all">
                            <QueueCard
                                videoId={id}
                                highlight={id === videoId}
                            />
                        </Link>
                    ))}
            </div>
        </ScrollArea>
    )
}
