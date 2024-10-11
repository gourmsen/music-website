export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    payload: {};
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
    payload: {};
}

export interface VerifyRequest {
    token: string;
}

export interface VerifyResponse {
    message: string;
    payload: {};
}

export interface ResendRequest {
    email: string;
}

export interface ResendResponse {
    message: string;
    payload: {};
}
