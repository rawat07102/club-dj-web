import { Player, PlayerConstructor, YT_PLAYER_STATE } from "./ytIframe.types"

declare global {
    interface Window {
        player: Player
        YT: {
            Player: PlayerConstructor
            PlayerState: YT_PLAYER_STATE
        }
        onYouTubeIframeAPIReady: () => void
        currentIndex: number
    }
}

export interface YTVideo {
    thumbnails: {
        medium: {
            url: string
        }
    }
    title: string
    channelTitle: string
}

interface BaseEntity {
    id: string
    created: string
    updated: string
}

export interface User extends BaseEntity {
    username: string
    bio: string
    profilePic?: string
    password: string
    playlists: Playlist[]
    clubs: Club[]
}

export interface Genre extends BaseEntity {
    name: string
}

export interface Club extends BaseEntity {
    name: string
    description: string
    queue: string[] | null
    genres: Genre[]
    thumbnail?: string
    creatorId: BaseEntity["id"]
    creator: User
    playlists: Playlist[]
    timeBeforeNextQueue: number
    currentVideo: string | null
    currentVideoStartTime: string | null
    voteSkipCount: number
    votes: string[] | null
}

export interface Playlist extends BaseEntity {
    name: string
    list: string[] | null
    description: string
    creator: User
    creatorId: BaseEntity["id"]
    club: Club
    thumbnail?: string
}
