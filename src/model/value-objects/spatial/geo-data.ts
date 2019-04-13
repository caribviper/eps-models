/**
 * Named geometry types
 */
export const GEOMETRY_NAMED_TYPES = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  FEATURE: 'Feature',
  FEATURE_COLLECTION: 'FeatureCollection'
}

/** Store base crs for all FeatureCollection */
export const CRS = {
  type: 'name',
  properties: {
    name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
  }
};

/**Base geometry structure to be implemented by all geometry types */
export interface IGeometry {
  type: string;
  coordinates: number[] | number[][] | number[][][] | number[][][][];
}

export class geoPoint {
  constructor(public readonly x: number, public readonly y: number, public readonly z: number = undefined, public readonly temporal: number = undefined) {
  }
}

export class Point implements IGeometry {
  public readonly type: string = GEOMETRY_NAMED_TYPES.POINT;
  public coordinates: number[];
  constructor(x: number, y: number) {
    this.coordinates = [x, y];
  }
}

export class MultiPoint implements IGeometry {
  public readonly type: string = GEOMETRY_NAMED_TYPES.MULTI_POINT;
  public coordinates: number[][];
  constructor(...points: number[][]) {
    this.coordinates = points;
  }
}

export class LineString implements IGeometry {
  public readonly type: string = GEOMETRY_NAMED_TYPES.LINE_STRING;
  public coordinates: number[][];
  constructor(...points: number[][]) {
    this.coordinates = points;
  }
}

export class MultiLineString implements IGeometry {
  public readonly type: string = GEOMETRY_NAMED_TYPES.MULTI_LINE_STRING;
  public coordinates: number[][][];
  constructor(...points: number[][][]) {
    this.coordinates = points;
  }
}

export class Polygon implements IGeometry {
  public readonly type: string = GEOMETRY_NAMED_TYPES.POLYGON;
  public coordinates: number[][][];
  constructor(...points: number[][][]) {
    this.coordinates = points;
  }
}

export class MultiPolygon implements IGeometry {
  public readonly type: string = GEOMETRY_NAMED_TYPES.MULTI_POLYGON;
  public coordinates: number[][][][];
  constructor(...points: number[][][][]) {
    this.coordinates = points;
  }
}

export interface IFeature {
  type: string;
  geometry: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
  properties: {};
}

export class Feature {
  public readonly type: string = GEOMETRY_NAMED_TYPES.FEATURE;
  constructor(public geometry: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon, public properties: {} = {}) {
  }

  public static createNamedFeature(name: string, geometry: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon) {
    return new Feature(geometry, { name: name });
  }
}

export class FeatureCollection {
  public readonly type: string = GEOMETRY_NAMED_TYPES.FEATURE_COLLECTION;
  crs = CRS;
  
  constructor(public name: string, public features: Feature[] = []) {
    if (!name) throw 'Invalid FeatureCollection name'
    if (!features) features = [];
  }
}

export class FeatureStyle {
  /**name of style */
  public name: string;

  /**Json propties associated with the style */
  public properties: {} = {};
}
