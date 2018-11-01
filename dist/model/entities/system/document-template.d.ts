import { Entity } from 'caribviper-entity';
export declare class DocumentTemplate extends Entity {
    name: string;
    template: string;
    constructor(name?: string, template?: string);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: any): DocumentTemplate;
    static mapToEntityArray(source: DocumentTemplate[]): DocumentTemplate[];
}
