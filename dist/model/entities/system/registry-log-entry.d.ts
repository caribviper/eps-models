import { Entity } from 'caribviper-entity';
export declare class RegistryLogEntry extends Entity {
    registryId: string;
    eventDate: number;
    description: string;
    category: string;
    constructor(registryId?: string, eventDate?: number, description?: string, category?: string);
    validateEntity(): void;
    static createId(registryId?: string, eventDate?: number): string;
    static mapToEntity(source: any): RegistryLogEntry;
    static mapToEntityArray(source: RegistryLogEntry[]): RegistryLogEntry[];
}
