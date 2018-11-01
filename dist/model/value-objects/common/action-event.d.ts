import { UserInfo } from './userinfo';
export declare const EVENT_TYPES: {
    CREATED: string;
    DISPATCHED: string;
    FINALISED: string;
    COMPLETED: string;
};
export declare class ActionEvent {
    action: string;
    date: Date;
    user: UserInfo;
    constructor(action: string, date: Date, user: UserInfo);
}
