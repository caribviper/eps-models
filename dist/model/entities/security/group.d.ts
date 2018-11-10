import { Entity } from 'caribviper-entity';
export declare class Group extends Entity {
    groupName: string;
    description: string;
    pooled: boolean;
    resources: string[];
    constructor(groupName?: string, description?: string, pooled?: boolean);
    validateEntity(): void;
    static createId(groupName: string): string;
    static mapToEntity(source: any): Group;
    static mapToEntityArray(source: Group[]): Group[];
    private ensureResoureInitialised();
    addResource(resourceId: string): void;
    removeResource(resourceId: string): void;
}
