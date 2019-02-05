import { Entity } from 'caribviper-entity';
export declare const FILE_STATES: {
    LOCAL: string;
    REMOTE: string;
    REPLICATED: string;
};
export declare const FILE_EVENTS: {
    CREATED: string;
    DELETED: string;
};
export declare class FileEvent extends Entity {
    registryId: string;
    filePath: string;
    state: string;
    event: string;
    date: Date;
    constructor(registryId?: string, filePath?: string, state?: string, event?: string);
    validateEntity(): void;
    static createId(filepath?: string): string;
    static mapToEntity(source: any): FileEvent;
    static mapToEntityArray(source: FileEvent[]): FileEvent[];
}
