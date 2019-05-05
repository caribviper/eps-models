import { Entity } from 'caribviper-entity';
export declare class SpatialTileLayer extends Entity {
    name: string;
    description: string;
    templateUrl: string;
    tileLayerOptions: {};
    esriDynamicLayer: boolean;
    constructor(name?: string, description?: string, templateUrl?: string, tileLayerOptions?: {});
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: SpatialTileLayer | Entity): SpatialTileLayer;
    static mapToEntityArray(source: SpatialTileLayer[]): SpatialTileLayer[];
}
