import { Entity } from 'caribviper-entity';
export declare class SecurityToken extends Entity {
    username: string;
    tokenHash: string;
    expiresTimestamp: number;
    valid: boolean;
    dateCreated: Date;
    constructor(username?: string, tokenHash?: string, expiresTimestamp?: number);
    hasExpired(): boolean;
    validateEntity(): void;
    static createId(username: string): string;
    static mapToEntity(source: any): SecurityToken;
    static mapToEntityArray(source: SecurityToken[]): SecurityToken[];
}
