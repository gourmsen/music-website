import { db } from "../../modules/database";
import { Song, SongInsert, SongUpdate } from "../types/song";

export async function findSongById(id: number) {
    // prettier-ignore
    return await db
        .selectFrom("songs")
        .where("id", "=", id)
        .selectAll()
        .executeTakeFirst();
}

export async function listSongs() {
    // prettier-ignore
    return await db
        .selectFrom("songs")
        .selectAll()
        .execute();
}
