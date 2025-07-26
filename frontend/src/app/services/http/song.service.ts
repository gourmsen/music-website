// basic
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

// http
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs";
import { SongDetailResponse, SongListResponse } from "../../interfaces/song";

// services
import { ErrorHandlerService } from "../app/error-handler.service";

@Injectable({
    providedIn: "root",
})
export class SongService {
    constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    view(id: number) {
        // prettier-ignore
        return this.httpClient
            .get<SongDetailResponse>(environment.apiUrl + "/song-detail?id=" + id, { observe: "response", withCredentials: true })
            .pipe(catchError((error) => this.errorHandlerService.handleHttpError(error)));
    }

    list() {
        // prettier-ignore
        return this.httpClient
            .get<SongListResponse>(environment.apiUrl + "/song-list", { observe: "response", withCredentials: true })
            .pipe(catchError((error) => this.errorHandlerService.handleHttpError(error)));
    }
}
