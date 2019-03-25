import { BroadcastUserMessageInstance } from './broadcast-user-message-instance';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class BroadcastMessageReceiver {
    readonly domains: string[];
    readonly groups: string[];
    readonly users: string[];
    constructor();
}
export declare class BroadcastMessage extends Entity {
    guid: string;
    title: string;
    message: string;
    creator: UserInfo;
    dateCreated: Date;
    dateDispatched: Date;
    activeDays: number;
    broadcastReceivers: BroadcastMessageReceiver;
    constructor(guid?: string, title?: string, message?: string, creator?: UserInfo);
    readonly expirationDate: Date;
    readonly canBroadcast: boolean;
    validateEntity(): void;
    broadcast(users?: string[]): BroadcastUserMessageInstance[];
    static createId(guid?: string): string;
    static mapToEntity(source: any): BroadcastMessage;
    static mapToEntityArray(source: BroadcastMessage[]): BroadcastMessage[];
}
