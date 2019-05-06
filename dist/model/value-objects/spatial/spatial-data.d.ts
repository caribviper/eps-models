export declare const GEOMETRY_NAMED_TYPES: {
    POINT: string;
    LINE_STRING: string;
    POLYGON: string;
    MULTI_POINT: string;
    MULTI_LINE_STRING: string;
    MULTI_POLYGON: string;
    FEATURE: string;
    FEATURE_COLLECTION: string;
};
export declare const CRS: {
    type: string;
    properties: {
        name: string;
    };
};
export interface IGeometry {
    type: string;
    coordinates: number[] | number[][] | number[][][] | number[][][][];
}
export declare class geoPoint {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly temporal: number;
    constructor(x: number, y: number, z?: number, temporal?: number);
}
export declare class Point implements IGeometry {
    readonly type: string;
    coordinates: number[];
    constructor(x: number, y: number);
}
export declare class MultiPoint implements IGeometry {
    readonly type: string;
    coordinates: number[][];
    constructor(...points: number[][]);
}
export declare class LineString implements IGeometry {
    readonly type: string;
    coordinates: number[][];
    constructor(...points: number[][]);
}
export declare class MultiLineString implements IGeometry {
    readonly type: string;
    coordinates: number[][][];
    constructor(...points: number[][][]);
}
export declare class Polygon implements IGeometry {
    readonly type: string;
    coordinates: number[][][];
    constructor(...points: number[][][]);
}
export declare class MultiPolygon implements IGeometry {
    readonly type: string;
    coordinates: number[][][][];
    constructor(...points: number[][][][]);
}
export interface IFeature {
    type: string;
    geometry: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
    properties: {};
}
export declare class Feature {
    geometry: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
    properties: {};
    readonly type: string;
    constructor(geometry: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon, properties?: {});
    static createNamedFeature(name: string, geometry: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon): Feature;
}
export declare class FeatureCollection {
    name: string;
    features: Feature[];
    readonly type: string;
    crs: {
        type: string;
        properties: {
            name: string;
        };
    };
    constructor(name: string, features?: Feature[]);
}
export declare type FeatureStyleType = 'marker' | 'style';
export declare const FEATURE_STYLE_TYPES: {
    MARKER: FeatureStyleType;
    STYLE: FeatureStyleType;
};
export interface FeatureStylePredicate {
    match: any;
    property: string;
}
export declare class FeatureStyle {
    name: string;
    properties: any;
    type: FeatureStyleType;
    predicate: FeatureStylePredicate;
}
export declare class FeatureMapSetting {
    name: string;
    display: boolean;
}
export declare class TileMapSetting {
    name: string;
    legend: string;
    group: string;
    display: boolean;
}
export declare type GroupLayerType = 'feature' | 'tile';
export declare const GROUP_MAP_LAYER_TYPE: {
    FEATURE: GroupLayerType;
    TILE: GroupLayerType;
};
export declare class GroupMapLayerItem {
    name: string;
    legend: string;
    group: string;
    display: boolean;
    type: GroupLayerType;
    legendImage: string;
    layerId: string;
    constructor(name: string, legend?: string, group?: string, display?: boolean, type?: GroupLayerType, legendImage?: string);
}
export declare class GroupLayerLegend {
    name: string;
    legend: string;
    image: string;
    constructor(name: string, legend?: string, image?: string);
}
