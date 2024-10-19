import { User } from "./user";
import { Song } from "./song";
import { Tab } from "./tab";

export interface Database {
    users: User;
    songs: Song;
    tabs: Tab;
}
