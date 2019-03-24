import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class BroadcastReceiver {
    readonly domains: string[];
    readonly groups: string[];
    readonly users: string[];
    constructor();
}
export declare class Broadcast extends Entity {
    guid: string;
    title: string;
    message: string;
    creator: UserInfo;
    dateCreated: Date;
    dateDispatched: Date;
    activeDays: number;
    broadcastReceivers: BroadcastReceiver;
    constructor(guid?: string, title?: string, message?: string, creator?: UserInfo);
    readonly expirationDate: Date;
    validateEntity(): void;
    finalise(): void;
    static createId(guid?: string): string;
    static mapToEntity(source: any): Broadcast;
    static mapToEntityArray(source: Broadcast[]): Broadcast[];
}
