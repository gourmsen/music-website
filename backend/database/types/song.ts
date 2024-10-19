import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Song {
    id: Generated<number>;
    track_number: ColumnType<number>;
    title: ColumnType<string>;
    artist: ColumnType<string>;
    album: ColumnType<string>;
    difficulty: ColumnType<number>;
    created_at?: ColumnType<Date>;
    updated_at?: ColumnType<Date>;
}

export type SongSelect = Selectable<Song>;
export type SongInsert = Insertable<Song>;
export type SongUpdate = Updateable<Song>;
