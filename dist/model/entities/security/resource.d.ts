import { Entity } from 'caribviper-entity';
export declare class Resource extends Entity {
    url: string;
    verb: string;
    group: string;
    description: string;
    constructor(url?: string, verb?: string, group?: string, description?: string);
    validateEntity(): void;
    static createId(url: string, verb: string): string;
    static mapToEntity(source: any): Resource;
    static mapToEntityArray(source: Resource[]): Resource[];
}
