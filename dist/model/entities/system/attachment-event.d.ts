import { Entity } from 'caribviper-entity';
export declare const ATTACHMENT_STATES: {
    LOCAL: string;
    REMOTE: string;
    REPLICATED: string;
};
export declare const ATTACHMENT_EVENTS: {
    CREATED: string;
    DELETED: string;
};
export declare class AttachmentEvent extends Entity {
    registryId: string;
    filePath: string;
    state: string;
    event: string;
    date: Date;
    constructor(registryId?: string, filePath?: string, state?: string, event?: string);
    validateEntity(): void;
    static createId(filepath?: string): string;
    static mapToEntity(source: any): AttachmentEvent;
    static mapToEntityArray(source: AttachmentEvent[]): AttachmentEvent[];
}
