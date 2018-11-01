import { Entity } from 'caribviper-entity';
export declare class Favourite extends Entity {
    referenceNo: string;
    registryId: string;
    username: string;
    constructor(referenceNo?: string, registryId?: string, username?: string);
    validateEntity(): void;
    static createId(username: string, registryId?: string): string;
    static mapToEntity(source: any): Favourite;
    static mapToEntityArray(source: Favourite[]): Favourite[];
}
