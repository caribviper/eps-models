import { Entity } from 'caribviper-entity';
import { FeatureMapSetting } from '../../value-objects/spatial/spatial-data';
export declare class SpatialMapOptions {
    zoomControl: boolean;
    maxZoom: number;
    minZoom: number;
    zoom: number;
    bounds: [number, number][];
    center: [number, number];
}
export declare class SpatialMap extends Entity {
    name: string;
    description: string;
    tiles: string[];
    features: FeatureMapSetting[];
    options: SpatialMapOptions;
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
    static createId(name?: string): string;
    static mapToEntity(source: SpatialMap | Entity): SpatialMap;
    static mapToEntityArray(source: SpatialMap[]): SpatialMap[];
}
