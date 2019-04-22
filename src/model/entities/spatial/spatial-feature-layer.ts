import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { FeatureCollection, FeatureStyle } from './../../value-objects/spatial/spatial-data';
import { Entity } from "caribviper-entity";

/**
 * Geometry feature layer
 */
export class SpatialFeatureLayer extends Entity {

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
    super(ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER, SpatialFeatureLayer.createId(name), true);
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.name, 'Must have a valid name');
    Assert.isTruthy(this.featureCollection, 'Must have a valid FeatureCollection');
  }

  /**
   * Adds a FeatureStyle
   * @param featureStyle FeatureStyle to be added
   */
  public addFeatureStyle(featureStyle: FeatureStyle) {
    this.featureStyles = this.featureStyles || [];
    if (!this.featureStyles.findIndex(f => f.name === featureStyle.name))
      this.featureStyles.push(featureStyle);
  }

  /**
   * Removes a FeatureStyle
   * @param featureStyle FeatureStyle to be removed
   */
  public removeFeature(featureStyle: FeatureStyle) {
    this.featureStyles = this.featureStyles || [];
    const index = this.featureStyles.findIndex(f => f.name === featureStyle.name);
    if (index > -1)
      this.featureStyles.splice(index, 1);
  }

  public canMoveFeatureStyleUp(index: number): boolean {
    return (!!this.featureStyles && this.featureStyles.length > 1 && index > 0);
  }

  public canMoveFeatureStyleDown(index: number): boolean {
    return (!!this.featureStyles && this.featureStyles.length > 1 && index < this.featureStyles.length - 1);
  }

  /**
   * Moves a FeatureStyle up, if it can do so
   * @param index Index position of FeatureStyle to be moved
   */
  public moveFeatureStyleUp(index: number) {
    if (this.canMoveFeatureStyleUp(index)) {
      [this.featureStyles[index - 1], this.featureStyles[index]] = [this.featureStyles[index], this.featureStyles[index - 1]];
    }
  }

  /**
   * Moves a FeatureStyle down, if it can do so
   * @param index Index position of FeatureStyle to be moved
   */
  public moveFeatureStyleDown(index: number) {
    if (this.canMoveFeatureStyleDown(index)) {
      [this.featureStyles[index], this.featureStyles[index + 1]] = [this.featureStyles[index + 1], this.featureStyles[index]];
    }
  }

  public static createId(name: string = ''): string {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER);
    return Entity.generateId(ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: SpatialFeatureLayer | Entity): SpatialFeatureLayer {
    let r: SpatialFeatureLayer = Object.assign(new SpatialFeatureLayer(), source);
    return r;
  }

  public static mapToEntityArray(source: SpatialFeatureLayer[]): SpatialFeatureLayer[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(r => {
      array.push(this.mapToEntity(r));
    });
    return array;
  }

}
