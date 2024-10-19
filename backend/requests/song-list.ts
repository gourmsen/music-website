// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as songRepo from "../database/repos/song";
import { handleError } from "../classes/errors";

export const listSongs = async () => {
    try {
        let songs = await songRepo.listSongs();

        // prepare response
        let response: DefaultResponse = {
            message: "Songs retrieved successfully",
            payload: {
                songs: songs,
            },
        };

        return response;
    } catch (error) {
        throw handleError(error);
    }
};
