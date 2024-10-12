export interface UserUpdateRequest {
    token?: string,
    email?: string,
    password?: string,
}

export interface UserUpdateResponse {
    message: string;
    payload: {
        user: any;
    };
}
