import { Entity } from 'caribviper-entity';
export declare class GeoTileLayer extends Entity {
    name: string;
    description: string;
    templateUrl: string;
    tileLayerOptions: {};
    constructor(name?: string, description?: string, templateUrl?: string, tileLayerOptions?: {});
    validateEntity(): void;
    static createId(name: string): string;
    static mapToEntity(source: GeoTileLayer | Entity): GeoTileLayer;
    static mapToEntityArray(source: GeoTileLayer[]): GeoTileLayer[];
}
