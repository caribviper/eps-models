import { FeatureCollection } from './../../value-objects/geometry/geo-data';
import { Entity } from "caribviper-entity";
export declare class GeoFeatureLayer extends Entity {
    name: string;
    featureCollection: FeatureCollection;
    popUpContent: string;
    show: boolean;
    description: string;
    constructor(name?: string, featureCollection?: FeatureCollection, popUpContent?: string);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: GeoFeatureLayer | Entity): GeoFeatureLayer;
    static mapToEntityArray(source: GeoFeatureLayer[]): GeoFeatureLayer[];
}
