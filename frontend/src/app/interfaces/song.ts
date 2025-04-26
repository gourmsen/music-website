export interface SongListResponse {
    message: string;
    payload: {
        songs: Song[];
    };
}

export interface SongDetailResponse {
    message: string;
    payload: {
        song: Song;
    };
}

export interface Song {
    id: number;
    track_number: number;
    title: string;
    artist: string;
    album: string;
    difficulty: string;
    created_at: string;
    updated_at: string;
}
