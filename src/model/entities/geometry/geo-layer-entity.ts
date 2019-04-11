import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { FeatureCollection } from './../../value-objects/geometry/geo-data';
import { Entity } from "caribviper-entity";

export class GeoLayerEntity extends Entity {

  /**
   * Indicates that the layer should be displayed by default
   */
  public show: boolean = false;

  /**
   * Creates a new GeoLayerEntity
   * @param name Name of the layer
   * @param featureCollection FeatureCollection data
   * @param popUpContent Pop content written in handlebar
   */
  constructor(public name?: string, public featureCollection?: FeatureCollection, public popUpContent?: string) {
    super(ENTITY_MODELS.GEOMETRY.GEO_LAYER, GeoLayerEntity.createId(name), true);
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.name, 'Must have a valid name');
    Assert.isTruthy(this.featureCollection, 'Must have a valid FeatureCollection');
  }

  public static createId(name: string = ''): string {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.GEOMETRY.GEO_LAYER);
    return Entity.generateId(ENTITY_MODELS.GEOMETRY.GEO_LAYER, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: GeoLayerEntity | Entity): GeoLayerEntity {
    let r: GeoLayerEntity = Object.assign(new GeoLayerEntity(), source);
    return r;
  }

  public static mapToEntityArray(source: GeoLayerEntity[]): GeoLayerEntity[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(r => {
      array.push(this.mapToEntity(r));
    });
    return array;
  }

}
