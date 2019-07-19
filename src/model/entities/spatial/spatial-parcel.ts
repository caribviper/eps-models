import { Entity } from 'caribviper-entity';
import { ENTITY_MODELS, Feature } from '../../..';
import { Assert } from 'caribviper-common';

/**
 * Spatial parcel
 */
export class SpatialParcel extends Entity {

    /**
     * Creates a new GeoLayerEntity
     * @param feature Feature associated with parcel
     */
    constructor(public feature?: Feature) {
        super(ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER, SpatialParcel.createId(), true);
    }

    validateEntity() {
      Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
      Assert.isTruthy(this.feature, 'Must have a valid feature');
    }

    public static createId(name: string = ''): string {
      return Entity.generateId(ENTITY_MODELS.SPATIAL.SPATIAL_PARCEL);
    }
  
    /**
     * Maps data from source to an entity of this type
     * @param source Data to be mapped to the entity
     */
    public static mapToEntity(source: SpatialParcel | Entity): SpatialParcel {
      let r: SpatialParcel = Object.assign(new SpatialParcel(), source);
      return r;
    }
  
    public static mapToEntityArray(source: SpatialParcel[]): SpatialParcel[] {
      if (source.length < 1)
        return [];
      let array = [];
      source.forEach(r => {
        array.push(this.mapToEntity(r));
      });
      return array;
    }
}