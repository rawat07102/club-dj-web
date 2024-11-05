interface BaseEntity {
    id: number
    created: Date
    updated: Date
}

export interface User extends BaseEntity {
    username: string
    bio: string
    email: string
    profilePic?: string
    password: string
    stars: number
    friends: User[]
    playlists: Playlist[]
    sharedPlaylists: Playlist[]
    clubs: Club[]
    wishlistJoined: Club
    clubsFollowed: Club[]
}

export interface Genre extends BaseEntity {
    name: string
}

export interface Club extends BaseEntity {
    name: string
    description: string
    queue: string[]
    genres: Genre[]
    thumbnail?: string
    currentDJ: User
    djWishlist: User[]
    creatorId: number
    creator: User
    followers: User[]
    followersCount: number
    playlists: Playlist[]
}

export interface Playlist extends BaseEntity {
    name: string
    list?: string[]
    description: string
    likeCount: number
    creator: User
    club: Club
    thumbnail?: string
}

export interface FriendRequest extends BaseEntity {
    from: User
    to: User
    isPending: boolean
}
