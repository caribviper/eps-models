import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class Minute extends Entity {
    registryId: string;
    date: Date;
    author: UserInfo;
    recipient: UserInfo;
    content: string;
    minuteNo: number;
    seen: Date;
    documentId: string;
    attachmentId: string;
    minuteReplyId: string;
    officialMinute: boolean;
    constructor(registryId?: string, guid?: string, author?: UserInfo, recipient?: UserInfo, content?: string);
    validateEntity(): void;
    markAsSeen(): void;
    static createId(registryId?: string, guid?: string): string;
    static mapToEntity(source: any): Minute;
    static mapToEntityArray(source: Minute[]): Minute[];
}
