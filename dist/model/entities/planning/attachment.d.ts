import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class Attachment extends Entity {
    registryId: string;
    dateAttached: Date;
    attachedBy: UserInfo;
    description: string;
    isPublic: boolean;
    filename: string;
    category: string;
    constructor(registryId?: string, guid?: string, filename?: string, attachedBy?: UserInfo, description?: string);
    validateEntity(): void;
    static createId(registryId?: string, guid?: string): string;
    static mapToEntity(source: any): Attachment;
    static mapToEntityArray(source: Attachment[]): Attachment[];
}
