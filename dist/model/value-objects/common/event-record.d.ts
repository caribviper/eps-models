import { UserInfo } from './userinfo';
export declare class EventRecord {
    created: Date;
    creator: UserInfo;
    signed: Date;
    signer: UserInfo;
    dispatched: Date;
    dispatcher: UserInfo;
    constructor(user: UserInfo);
    readonly canDispatch: boolean;
    sign(user: UserInfo): void;
    dispatch(user: UserInfo): void;
}
