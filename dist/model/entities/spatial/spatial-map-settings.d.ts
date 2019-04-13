import { Entity } from 'caribviper-entity';
import { FeatureMapSetting } from '../../value-objects/spatial/spatial-data';
export declare class SpatialMapSettings extends Entity {
    name: string;
    description: string;
    tiles: string[];
    features: FeatureMapSetting[];
    options: {
        zoomControl: boolean;
        maxZoom: number;
        minZoom: number;
        zoom: number;
        bounds: [number, number][];
        center: [number, number];
    };
    constructor(name?: string, description?: string, tiles?: string[], features?: FeatureMapSetting[]);
    validateEntity(): void;
    addTile(tile: string): void;
    removeTile(tile: string): void;
    addFeature(feature: FeatureMapSetting): void;
    removeFeature(feature: FeatureMapSetting): void;
    canMoveTileUp(index: number): boolean;
    canMoveTileDown(index: number): boolean;
    moveTileUp(index: number): void;
    moveTileDown(index: number): void;
    static createId(name: string): string;
    static mapToEntity(source: SpatialMapSettings | Entity): SpatialMapSettings;
    static mapToEntityArray(source: SpatialMapSettings[]): SpatialMapSettings[];
}
