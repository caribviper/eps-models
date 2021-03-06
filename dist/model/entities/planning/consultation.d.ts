import { AttachedPicture } from './../../value-objects/planning/report';
import { Contact } from './../../value-objects/common/contact';
import { UserInfo } from './../../value-objects/common/userinfo';
import { DocumentEntity } from '../document-entity';
export declare class Consultation extends DocumentEntity {
    registryId: string;
    dateCompleted: Date;
    dateRequested: Date;
    dateDue: Date;
    requestingUser: UserInfo;
    returnedByUser: UserInfo;
    organisation: Contact;
    agencyCode: string;
    comments: string;
    agencyComment: string;
    documentId: string;
    attachment: string;
    attachedPictures: AttachedPicture[];
    constructor(registryId?: string, guid?: string, organisation?: Contact, comments?: string, documentId?: string, attachmentId?: string);
    readonly hasPictures: boolean;
    validateEntity(): void;
    static createId(registryId?: string, guid?: string): string;
    static mapToEntity(source: any): Consultation;
    static mapToEntityArray(source: Consultation[]): Consultation[];
}
