import { User } from "./user";
import { Song } from "./song";

export interface Database {
    users: User;
    songs: Song;
}
