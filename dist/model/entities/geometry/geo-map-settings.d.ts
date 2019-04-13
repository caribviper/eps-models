import { Entity } from 'caribviper-entity';
export declare class GeoMapSettings extends Entity {
    name: string;
    description: string;
    tiles: string[];
    features: string[];
    options: {
        zoomControl: boolean;
        maxZoom: number;
        minZoom: number;
        zoom: number;
        bounds: [number, number][];
        center: [number, number];
    };
    constructor(name?: string, description?: string, tiles?: string[], features?: string[]);
    validateEntity(): void;
    addTile(tile: string): void;
    removeTile(tile: string): void;
    addFeature(feature: string): void;
    removeFeature(feature: string): void;
    canMoveTileUp(index: number): boolean;
    canMoveTileDown(index: number): boolean;
    moveTileUp(index: number): void;
    moveTileDown(index: number): void;
    static createId(name: string): string;
    static mapToEntity(source: GeoMapSettings | Entity): GeoMapSettings;
    static mapToEntityArray(source: GeoMapSettings[]): GeoMapSettings[];
}
