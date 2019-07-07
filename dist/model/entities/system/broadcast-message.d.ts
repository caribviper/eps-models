import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class BroadcastMessage extends Entity {
    guid: string;
    title: string;
    message: string;
    creator: UserInfo;
    dateCreated: Date;
    dateDispatched: Date;
    activeDays: number;
    domains: string[];
    constructor(guid?: string, title?: string, message?: string, creator?: UserInfo);
    readonly expirationDate: Date;
    readonly canBroadcast: boolean;
    readonly dispatched: boolean;
    validateEntity(): void;
    broadcast(): void;
    recall(): void;
    static createId(guid?: string): string;
    static mapToEntity(source: any): BroadcastMessage;
    static mapToEntityArray(source: BroadcastMessage[]): BroadcastMessage[];
}
