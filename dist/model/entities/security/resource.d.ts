import { Entity } from 'caribviper-entity';
export declare type ResourceType = 'api' | 'view';
export declare class Resource extends Entity {
    resourceType: ResourceType | string;
    operation: string;
    category: string;
    description: string;
    constructor(resourceType?: ResourceType | string, operation?: string, category?: string, description?: string);
    validateEntity(): void;
    static createId(resourceType?: ResourceType | string, operation?: string): string;
    static mapToEntity(source: any): Resource;
    static mapToEntityArray(source: Resource[]): Resource[];
}
