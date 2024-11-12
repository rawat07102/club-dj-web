import { ScrollArea } from "@/components/ui/scroll-area"
import { Club } from "@/lib/types"
import QueueCard from "./queue-card"

type Props = {
    queue: Club["queue"]
    videoId: string
}

export default function Queue({ queue, videoId }: Props) {
    return (
        <ScrollArea className="w-full">
            <div className="flex flex-col gap-2 py-2">
                {queue && queue.map((id) => (
                    <QueueCard
                        key={id}
                        videoId={id}
                        highlight={id === videoId}
                    />
                ))}
            </div>
        </ScrollArea>
    )
}
