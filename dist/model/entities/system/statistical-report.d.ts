import { Entity } from 'caribviper-entity';
export declare class StatisticalReport extends Entity {
    name: string;
    description: string;
    data: object;
    hasTable: boolean;
    hasChart: boolean;
    query: string;
    parameters: [];
    constructor(name?: string);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: any): StatisticalReport;
    static mapToEntityArray(source: StatisticalReport[]): StatisticalReport[];
}
