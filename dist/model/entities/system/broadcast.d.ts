import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class Broadcast extends Entity {
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
    validateEntity(): void;
    finalise(): void;
    static createId(guid?: string): string;
    static mapToEntity(source: any): Broadcast;
    static mapToEntityArray(source: Broadcast[]): Broadcast[];
}
