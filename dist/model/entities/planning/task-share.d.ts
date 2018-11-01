import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class TaskShareItem {
    principle: UserInfo;
    users: UserInfo[];
    constructor();
}
export declare class TaskShare extends Entity {
    shares: TaskShareItem[];
    constructor();
    validateEntity(): void;
    sortShares(): void;
    addShare(share: TaskShareItem): boolean;
    removeShare(username: string): void;
    clearShares(): void;
    static createId(): string;
    static mapToEntity(source: any): TaskShare;
    static mapToEntityArray(source: TaskShare[]): TaskShare[];
}
