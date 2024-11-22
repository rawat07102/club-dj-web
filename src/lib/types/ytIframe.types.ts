export interface PlayerConstructor {
    new (targetEl: string, options: PlayerOptions): Player
}

export interface Player {
    loadPlaylist(
        playlist: string | string[],
        index?: number,
        startSeconds?: number
    ): void
    loadPlaylist(loadPlaylistOptions: LoadPlaylistOptions): void
    unMute(): void
    loadVideoById(id: string): void
    playVideo(): void
    getVideoUrl(): void
    getPlaylistIndex(): void
}

export interface LoadPlaylistOptions {
    list: string
    listType?: "playlist" | "user_uploads"
    index?: number
    startSeconds?: number
}

export interface PlayerOptions {
    videoId?: string
    height?: number
    width?: number
    events?: PlayerEvents
    playerVars?: PlayerParameters
}

export interface PlayerParameters {
    autoplay?: 0 | 1
    controls?: 0 | 1
    disablekb?: 0 | 1
    iv_load_policy?: 1 | 3
}

export interface PlayerEvents {
    onReady(): void
    onStateChange(state: { data: YT_PLAYER_STATE | -1; X: Player }): void
}

export enum YT_PLAYER_STATE {
    ENDED,
    PLAYING,
    PAUSED,
    BUFFERING,
    CUED,
}
