import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Tab {
    id: Generated<number>;
    song_id: ColumnType<number>;
    format: ColumnType<string>;
    url: ColumnType<string>;
    created_at?: ColumnType<Date>;
    updated_at?: ColumnType<Date>;
}

export type TabSelect = Selectable<Tab>;
export type TabInsert = Insertable<Tab>;
export type TabUpdate = Updateable<Tab>;
