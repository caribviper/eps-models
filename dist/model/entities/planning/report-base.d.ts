import { Entity } from 'caribviper-entity';
import { UserInfo } from './../../value-objects/common/userinfo';
import { AttachedPicture } from './../../value-objects/planning/report';
export declare abstract class BaseReport extends Entity {
    content: string;
    recommendations: string;
    description: string;
    dateAttached: Date;
    dateCreated: Date;
    attachedPictures: AttachedPicture[];
    photographsOnNewPage: boolean;
    author: UserInfo;
    documentId: string;
    registryId: string;
    recipient: UserInfo;
    readonly isFinalised: boolean;
    readonly hasPictures: boolean;
    validateEntity(): void;
    ensureNotFinalise(): void;
    updateContent(content: string, recommendations?: string): void;
    attachReport(): void;
}
