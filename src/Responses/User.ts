export interface User extends UserCompact {}
export interface UserCompact {
    id: number;
    username: string;
    country_code: string;
}
