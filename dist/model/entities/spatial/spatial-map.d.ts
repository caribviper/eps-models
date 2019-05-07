import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
import { GroupMapLayerItem } from '../../value-objects/spatial/spatial-data';
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
    layers: GroupMapLayerItem[];
    options: SpatialMapOptions;
    dataLayerIndex: number;
    domains: string[];
    createdBy: UserInfo;
    lastModifiedBy: UserInfo;
    created: Date;
    modified: Date;
    baseMapTile: string;
    public: boolean;
    constructor(name?: string, description?: string, layers?: GroupMapLayerItem[]);
    validateEntity(): void;
    readonly tiles: GroupMapLayerItem[];
    readonly features: GroupMapLayerItem[];
    readonly featuresSorted: GroupMapLayerItem[];
    readonly baseMapName: string;
    readonly baseMap: GroupMapLayerItem;
    readonly dataLayer: GroupMapLayerItem;
    addLayer(layer: GroupMapLayerItem): void;
    removeLayer(layer: string): void;
    readonly groupLayerNames: string[];
    canMoveLayerUp(index: number): boolean;
    canMoveLayerDown(index: number): boolean;
    moveLayerUp(index: number): void;
    moveLayerDown(index: number): void;
    static createId(name?: string): string;
    static mapToEntity(source: SpatialMap | Entity): SpatialMap;
    static mapToEntityArray(source: SpatialMap[]): SpatialMap[];
}
