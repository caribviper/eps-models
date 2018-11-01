import { Entity } from 'caribviper-entity';
export declare class ConvertionItem extends Entity {
    lastUpdate: Date;
    constructor(lastUpdate?: Date);
    validateEntity(): void;
    static createId(): string;
    static mapToEntity(source: any): ConvertionItem;
    static mapToEntityArray(source: ConvertionItem[]): ConvertionItem[];
}
