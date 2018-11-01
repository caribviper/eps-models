import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class Message extends Entity {
    guid: string;
    creator: UserInfo;
    recipient: UserInfo;
    message: string;
    created: number;
    registryId: string;
    referenceNo: string;
    link: string;
    dismissedDate: Date;
    readDate: Date;
    duplicate: number;
    reminderDate: number;
    constructor(guid?: string, creator?: UserInfo, recipient?: UserInfo, message?: string, created?: number);
    validateEntity(): void;
    readonly isAlert: boolean;
    readonly wasDismissed: boolean;
    setAlert(reminderDate: Date): void;
    setAlertByDays(days: number): void;
    dismiss(): void;
    readMessage(): void;
    static createDuplicate(message: Message, newRecipient: UserInfo): Message;
    static createId(username: string, guid?: string): string;
    static mapToEntity(source: any): Message;
    static mapToEntityArray(source: Message[]): Message[];
}
