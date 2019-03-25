import { Entity } from 'caribviper-entity';
export declare class BroadcastEvent extends Entity {
    broadcastId: string;
    username: string;
    expirationDate: Date;
    hidden: boolean;
    constructor(broadcastId?: string, username?: string, expirationDate?: Date);
    validateEntity(): void;
    hideBroadcast(): void;
    static createId(broadcastId?: string, username?: string): string;
    static mapToEntity(source: any): BroadcastEvent;
    static mapToEntityArray(source: BroadcastEvent[]): BroadcastEvent[];
}
