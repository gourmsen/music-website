// basic
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

// http
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs";
import { UserUpdateRequest, UserUpdateResponse } from "../../interfaces/user";

// services
import { ErrorHandlerService } from "../app/error-handler.service";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    update(request: UserUpdateRequest) {
        // prettier-ignore
        return this.httpClient
            .patch<UserUpdateResponse>(environment.apiUrl + "/user-update", request, { observe: "response" , withCredentials: true })
            .pipe(catchError((error) => this.errorHandlerService.handleHttpError(error)));
    }
}
