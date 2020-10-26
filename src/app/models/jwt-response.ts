export interface JwtResponseI {
    prefix: string;
    token: string;
    success: boolean;
    message: boolean;
    details: {
        created: string;
        expirationTime: number;
        active: true;
        authorities: string[];
        username: string;
    }
}
