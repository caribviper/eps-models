import { Entity } from 'caribviper-entity';
export declare type ResourceType = 'api' | 'view';
export declare class Resource extends Entity {
    url: string;
    verb: string;
    description: string;
    resourceType: ResourceType | string;
    constructor(url?: string, verb?: string, description?: string, resourceType?: ResourceType | string);
    validateEntity(): void;
    static createId(url: string, verb: string): string;
    static mapToEntity(source: any): Resource;
    static mapToEntityArray(source: Resource[]): Resource[];
}
