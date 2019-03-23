export declare class UserInfo {
    username: string;
    fullname: string;
    domain: string;
    constructor(username: string, fullname: string, domain: string);
    static EmptyUserInfo(): UserInfo;
}
export declare const SYSTEM_USER: UserInfo;
