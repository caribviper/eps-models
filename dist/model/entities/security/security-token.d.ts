import { Entity } from 'caribviper-entity';
export declare class SecurityToken extends Entity {
    username: string;
    token: string;
    expiresTimestamp: number;
    valid: boolean;
    dateCreated: Date;
    constructor(id?: string, username?: string, token?: string, expiresTimestamp?: number);
    hasExpired(): boolean;
    validateEntity(): void;
    static createId(id: string): string;
    static mapToEntity(source: any): SecurityToken;
    static mapToEntityArray(source: SecurityToken[]): SecurityToken[];
}
