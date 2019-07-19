import { FeatureCollection, FeatureStyle } from './../../value-objects/spatial/spatial-data';
import { Entity } from "caribviper-entity";
export declare class SpatialFeatureLayer extends Entity {
    name?: string;
    featureCollection?: FeatureCollection;
    popUpContent?: string;
    show: boolean;
    description: string;
    featureStyles: FeatureStyle[];
    constructor(name?: string, featureCollection?: FeatureCollection, popUpContent?: string);
    validateEntity(): void;
    addFeatureStyle(featureStyle: FeatureStyle): void;
    removeFeature(featureStyle: FeatureStyle): void;
    canMoveFeatureStyleUp(index: number): boolean;
    canMoveFeatureStyleDown(index: number): boolean;
    moveFeatureStyleUp(index: number): void;
    moveFeatureStyleDown(index: number): void;
    static createId(name?: string): string;
    static mapToEntity(source: SpatialFeatureLayer | Entity): SpatialFeatureLayer;
    static mapToEntityArray(source: SpatialFeatureLayer[]): SpatialFeatureLayer[];
}
