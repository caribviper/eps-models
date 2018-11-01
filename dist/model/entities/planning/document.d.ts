import { Entity } from 'caribviper-entity';
import { UserInfo } from './../../value-objects/common/userinfo';
export declare class DocumentModel {
    document: Document;
    model: any;
    constructor(document: Document, model?: any);
}
export declare class DocumentModelType {
    name: string;
    model: any;
    constructor(name: string, model: any);
}
export declare class DocumentDetails {
    template: string;
    models: DocumentModelType[];
    title: string;
    constructor(template: string, models?: DocumentModelType[], title?: string);
    readonly model: any;
}
export declare class DocumentUrl {
    url: any;
    title: string;
    constructor(url: any, title?: string);
}
export declare class DocumentProperty {
    title: string;
    subject: string;
    keywords: string;
    watermark: string;
    imagePath: string;
    code: string;
}
export declare class Document extends Entity {
    registryId: string;
    documentType: string;
    documentCode: string;
    property: DocumentProperty;
    dateCreated: Date;
    dateModified: Date;
    dispatchedDate: Date;
    dispatchedBy: UserInfo;
    owner: UserInfo;
    finalisedDate: Date;
    data: string;
    constructor(registryId?: string, documentCode?: string, property?: DocumentProperty, owner?: UserInfo);
    validateEntity(): void;
    readonly isDraft: boolean;
    dispatch(dispatchingUser: UserInfo): void;
    finalise(requestingUser: UserInfo): boolean;
    static createId(registryId?: string, guid?: string): string;
    static mapToEntity(source: any): Document;
    static mapToEntityArray(source: Document[]): Document[];
}
