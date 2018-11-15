import { ContactAttributes } from './../../value-objects/common/contact-attributes';
import { Entity } from 'caribviper-entity';
import { OrganisationInfo } from '../../value-objects/common/organisation-info';
export declare class Organisation extends Entity {
    orgId: string;
    name: string;
    description: string;
    contact: ContactAttributes;
    groups: string[];
    constructor(orgId?: string, name?: string, description?: string);
    validateEntity(): void;
    static createId(orgId?: string): string;
    static mapToEntity(source: any): Organisation;
    static mapToEntityArray(source: Organisation[]): Organisation[];
    static toOrganisationInfo(organisation: Organisation): OrganisationInfo;
    addGroup(group: string): void;
    removeGroup(group: string): void;
}
