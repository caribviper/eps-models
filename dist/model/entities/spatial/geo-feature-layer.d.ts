import { FeatureCollection, FeatureStyle } from './../../value-objects/spatial/geo-data';
import { Entity } from "caribviper-entity";
export declare class GeoFeatureLayer extends Entity {
    name: string;
    featureCollection: FeatureCollection;
    popUpContent: string;
    show: boolean;
    description: string;
    featureStyles: FeatureStyle[];
    constructor(name?: string, featureCollection?: FeatureCollection, popUpContent?: string);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: GeoFeatureLayer | Entity): GeoFeatureLayer;
    static mapToEntityArray(source: GeoFeatureLayer[]): GeoFeatureLayer[];
}
