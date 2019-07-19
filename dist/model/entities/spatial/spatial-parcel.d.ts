import { Entity } from 'caribviper-entity';
import { Feature } from '../../..';
export declare class SpatialParcel extends Entity {
    feature?: Feature;
    constructor(feature?: Feature);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: SpatialParcel | Entity): SpatialParcel;
    static mapToEntityArray(source: SpatialParcel[]): SpatialParcel[];
}
