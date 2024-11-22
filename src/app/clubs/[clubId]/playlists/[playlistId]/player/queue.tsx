import { ScrollArea } from "@/components/ui/scroll-area"
import { Club } from "@/lib/types"
import QueueCard from "./queue-card"

type Props = {
    queue: Club["queue"]
    videoId: string
    onNewVideo: (id: string) => void
}

export default function Queue({ queue, videoId, onNewVideo }: Props) {
    return (
        <ScrollArea className="w-full h-screen">
            <div className="flex flex-col mt-10 gap-2 py-2">
                {queue &&
                    queue.map((id) => (
                        <QueueCard
                            key={id}
                            onClick={() => {
                                window.player.loadVideoById(id)
                                onNewVideo(id)
                            }}
                            videoId={id}
                            highlight={id === videoId}
                        />
                    ))}
            </div>
        </ScrollArea>
    )
}
