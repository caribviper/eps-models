import { ContactAttributes } from '../../value-objects/common/contact-attributes';
import { Entity } from 'caribviper-entity';
import { DomainInfo } from '../../value-objects/common/domain-info';
export declare class Domain extends Entity {
    code: string;
    name: string;
    description: string;
    contact: ContactAttributes;
    groups: string[];
    constructor(code?: string, name?: string, description?: string);
    validateEntity(): void;
    static createId(code?: string): string;
    static mapToEntity(source: any): Domain;
    static mapToEntityArray(source: Domain[]): Domain[];
    static toDomainInfo(domain: Domain): DomainInfo;
    addGroup(group: string): void;
    removeGroup(group: string): void;
}
