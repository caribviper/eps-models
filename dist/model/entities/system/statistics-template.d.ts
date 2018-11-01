import { Entity } from 'caribviper-entity';
export declare class StatisticsTemplate extends Entity {
    name: string;
    template: string;
    constructor(name?: string, template?: string);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: any): StatisticsTemplate;
    static mapToEntityArray(source: StatisticsTemplate[]): StatisticsTemplate[];
}
