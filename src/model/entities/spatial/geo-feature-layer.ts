import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { FeatureCollection, FeatureStyle } from './../../value-objects/spatial/geo-data';
import { Entity } from "caribviper-entity";

/**
 * Geometry feature layer
 */
export class GeoFeatureLayer extends Entity {

  /**
   * Indicates that the layer should be displayed by default
   */
  public show: boolean = false;

  /**Describes the layer */
  public description: string = '';

  /**A list of styles denoted by style name */
  public featureStyles: FeatureStyle[] = [];

  /**
   * Creates a new GeoLayerEntity
   * @param name Name of the layer
   * @param featureCollection FeatureCollection data
   * @param popUpContent Pop content written in handlebar
   */
  constructor(public name?: string, public featureCollection?: FeatureCollection, public popUpContent?: string) {
    super(ENTITY_MODELS.GEOMETRY.GEO_FEATURE_LAYER, GeoFeatureLayer.createId(name), true);
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.name, 'Must have a valid name');
    Assert.isTruthy(this.featureCollection, 'Must have a valid FeatureCollection');
  }

  public static createId(name: string = ''): string {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.GEOMETRY.GEO_FEATURE_LAYER);
    return Entity.generateId(ENTITY_MODELS.GEOMETRY.GEO_FEATURE_LAYER, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: GeoFeatureLayer | Entity): GeoFeatureLayer {
    let r: GeoFeatureLayer = Object.assign(new GeoFeatureLayer(), source);
    return r;
  }

  public static mapToEntityArray(source: GeoFeatureLayer[]): GeoFeatureLayer[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(r => {
      array.push(this.mapToEntity(r));
    });
    return array;
  }

}
