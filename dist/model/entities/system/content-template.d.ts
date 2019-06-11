import { Entity } from 'caribviper-entity';
export declare class ContentTemplate extends Entity {
    name: string;
    template: string;
    constructor(name?: string, template?: string);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: any): ContentTemplate;
    static mapToEntityArray(source: ContentTemplate[]): ContentTemplate[];
}
