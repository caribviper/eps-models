import { WorkflowActivity } from './../../value-objects/workflow/workflow-activity';
import { Entity } from 'caribviper-entity';
export declare class WorkflowTemplate extends Entity {
    name: string;
    filePrefix: string;
    description: string;
    activities: WorkflowActivity[];
    constructor(name?: string, filePrefix?: string, description?: string);
    validateEntity(): void;
    readonly activityDays: number;
    addActivity(activity: string, estimatedDays: number): void;
    removeActivity(activityIndex: number): void;
    moveActivityUp(order: number): void;
    moveActivityDown(order: number): void;
    private swap;
    static createId(name?: string): string;
    static mapToEntity(source: any): WorkflowTemplate;
    static mapToEntityArray(source: WorkflowTemplate[]): WorkflowTemplate[];
}
export declare const WORKFLOW_STATES: {
    PENDING: string;
    COMPLETED: string;
    DEFERRED: string;
    CANCELED: string;
};
