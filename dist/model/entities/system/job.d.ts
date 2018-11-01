import { Entity } from 'caribviper-entity';
export declare class Job extends Entity {
    name: string;
    funcName: string;
    jobTime: string | Date;
    description: string;
    jobInstanceId: string;
    constructor(name?: string, funcName?: string, jobTime?: string | Date, description?: string);
    validateEntity(): void;
    static createId(name: string): string;
    static mapToEntity(source: any): Job;
    static mapToEntityArray(source: Job[]): Job[];
}
