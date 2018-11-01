import { Entity } from 'caribviper-entity';
export declare class LetterTemplateProperty {
    hasSubject: boolean;
    hasContact: boolean;
    hasSalutation: boolean;
    hasFormFields: boolean;
    hasPhotographs: boolean;
    constructor(hasSubject?: boolean, hasContact?: boolean, hasSalutation?: boolean, hasFormFields?: boolean, hasPhotographs?: boolean);
}
export declare class LetterTemplate extends Entity {
    name: string;
    template: string;
    properties: LetterTemplateProperty;
    constructor(name?: string, template?: string, properties?: LetterTemplateProperty);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: any): LetterTemplate;
    static mapToEntityArray(source: LetterTemplate[]): LetterTemplate[];
}
