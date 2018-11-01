import { Entity } from 'caribviper-entity';
export declare class ApplicationCounter extends Entity {
    year: number;
    applicationType: string;
    counter: number;
    registryId: string;
    constructor(year?: number, applicationType?: string, counter?: number, registryId?: string);
    validateEntity(): void;
    static createId(year: number, applicationType?: string, counter?: number): string;
    static mapToEntity(source: any): ApplicationCounter;
    static mapToEntityArray(source: ApplicationCounter[]): ApplicationCounter[];
}
