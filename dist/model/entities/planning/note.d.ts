import { Entity } from 'caribviper-entity';
import { UserInfo } from './../../value-objects/common/userinfo';
export declare class Note extends Entity {
    registryId: string;
    content: string;
    creator: UserInfo;
    expired: Date;
    created: Date;
    critical: boolean;
    constructor(guid?: string, registryId?: string, content?: string, creator?: UserInfo, expired?: Date);
    validateEntity(): void;
    static createId(registryId?: string, guid?: string): string;
    static mapToEntity(source: any): Note;
    static mapToEntityArray(source: Note[]): Note[];
}
