import { Entity } from 'caribviper-entity';
import { Contact } from "../../value-objects/common/contact";
export declare class Agency extends Entity {
    contact: Contact;
    isGovernment: boolean;
    consulting: boolean;
    code: string;
    constructor(contact?: Contact | string, guid?: string);
    validateEntity(): void;
    static createId(guid?: string): string;
    static mapToEntity(source: any): Agency;
    static mapToEntityArray(source: Agency[]): Agency[];
}
