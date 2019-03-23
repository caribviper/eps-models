import { Entity } from 'caribviper-entity';
export declare class BroadcastEvent extends Entity {
    broadcastId: string;
    username: string;
    hidden: boolean;
    constructor(broadcastId?: string, username?: string);
    validateEntity(): void;
    hideBroadcast(): void;
    static createId(broadcastId?: string, username?: string): string;
    static mapToEntity(source: any): BroadcastEvent;
    static mapToEntityArray(source: BroadcastEvent[]): BroadcastEvent[];
}
