import { Entity } from 'caribviper-entity';
export declare class UserToken extends Entity {
    username: string;
    token: string;
    expires: number;
    valid: boolean;
    dateCreated: Date;
    constructor(id?: string, idHasType?: boolean);
    hasExpired(): boolean;
    validateEntity(): void;
    static createNew(data: {
        username: string;
        expires: number;
        token: string;
        valid: boolean;
    }): UserToken;
    static createId(username: string, expires?: number): string;
    static mapToEntity(source: any): UserToken;
    static mapToEntityArray(source: UserToken[]): UserToken[];
}
