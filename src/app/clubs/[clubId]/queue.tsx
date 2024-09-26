import { ScrollArea } from "@/components/ui/scroll-area"
import { Club } from "@/lib/types"
import QueueCard from "./queue-card"

type Props = {
    queue: Club["queue"]
}

export default function Queue({ queue }: Props) {
    return (
        <ScrollArea className="w-full mt-12">
            {queue.map((videoId) => (
                <QueueCard videoId={videoId} />
            ))}
        </ScrollArea>
    )
}
