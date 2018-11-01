import { Entity } from 'caribviper-entity';
export declare class DecisionItemTemplate extends Entity {
    decisionType: string;
    itemNo: number;
    description: string;
    rationale: string;
    constructor(decisionType?: string, itemNo?: number, description?: string, rationale?: string);
    validateEntity(): void;
    static createId(decisionType?: string, itemNo?: number): string;
    static mapToEntity(source: any): DecisionItemTemplate;
    static mapToEntityArray(source: DecisionItemTemplate[]): DecisionItemTemplate[];
}
