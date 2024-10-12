// basic
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

// http
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyRequest,
    VerifyResponse,
    ResendRequest,
    ResendResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from "../../interfaces/auth";

// services
import { ErrorHandlerService } from "../app/error-handler.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    login(request: LoginRequest) {
        // prettier-ignore
        return this.httpClient
            .post<LoginResponse>(environment.apiUrl + "/login", request, { observe: "response" , withCredentials: true })
            .pipe(catchError((error) => this.errorHandlerService.handleHttpError(error)));
    }

    register(request: RegisterRequest) {
        // prettier-ignore
        return this.httpClient
            .post<RegisterResponse>(environment.apiUrl + "/register", request, { observe: "response", withCredentials: true })
            .pipe(catchError((error) => this.errorHandlerService.handleHttpError(error)));
    }

    verify(request: VerifyRequest) {
        // prettier-ignore
        return this.httpClient
            .post<VerifyResponse>(environment.apiUrl + "/verify-email", request, { observe: "response", withCredentials: true })
            .pipe(catchError((error) => this.errorHandlerService.handleHttpError(error)));
    }

    resend(request: ResendRequest) {
        // prettier-ignore
        return this.httpClient
            .post<ResendResponse>(environment.apiUrl + "/verify-resend", request, { observe: "response", withCredentials: true })
            .pipe(catchError((error) => this.errorHandlerService.handleHttpError(error)));
    }

    resetPassword(request: ResetPasswordRequest) {
        // prettier-ignore
        return this.httpClient
            .post<ResetPasswordResponse>(environment.apiUrl + "/reset-password", request, { observe: "response", withCredentials: true })
            .pipe(catchError((error) => this.errorHandlerService.handleHttpError(error)));
    }
}
