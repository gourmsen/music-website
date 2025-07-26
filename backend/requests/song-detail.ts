// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as songRepo from "../database/repos/song";

// errors
import { handleError, MissingFieldsError, SongNotFoundError } from "../classes/errors";

export const viewSong = async (id: number) => {
    try {
        // check for missing fields
        let missingFields: string[] = [];

        if (!id) {
            missingFields.push("id");
        }

        if (missingFields.length) {
            throw new MissingFieldsError(missingFields);
        }

        // check for song
        let song = await songRepo.findSongById(id);

        if (!song) {
            throw new SongNotFoundError();
        }

        // prepare response
        let response: DefaultResponse = {
            message: "Song retrieved successfully",
            payload: {
                song: song,
            },
        };

        return response;
    } catch (error) {
        throw handleError(error);
    }
};
