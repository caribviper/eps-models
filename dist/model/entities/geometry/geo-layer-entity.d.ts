import { FeatureCollection } from './../../value-objects/geometry/geo-data';
import { Entity } from "caribviper-entity";
export declare class GeoLayerEntity extends Entity {
    name: string;
    featureCollection: FeatureCollection;
    popUpContent: string;
    show: boolean;
    constructor(name?: string, featureCollection?: FeatureCollection, popUpContent?: string);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: GeoLayerEntity | Entity): GeoLayerEntity;
    static mapToEntityArray(source: GeoLayerEntity[]): GeoLayerEntity[];
}
