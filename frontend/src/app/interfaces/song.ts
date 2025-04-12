export interface SongListResponse {
    message: string;
    payload: {
        songs: any;
    };
}

export interface SongDetailResponse {
    message: string;
    payload: {
        song: any;
    };
}