import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

/**
 * Geometry tile layer
 */
export class SpatialTileLayer extends Entity {
  
  /**
   * Creates a new SpatialTileLayer
   * @param name Name of the layer
   * @param description Description about layer
   * @param templateUrl Template url used by later
   * @param tileLayerOptions Other layer options
   */
  constructor(public name?: string, public description?: string, public templateUrl?: string, public tileLayerOptions?:{}) {
    super(ENTITY_MODELS.SPATIAL.SPATIAL_TILE_LAYER, SpatialTileLayer.createId(name), true);
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.name, 'Must have a valid name');
    Assert.isTruthy(this.templateUrl, 'Must have a valid template url');
    Assert.isTruthy(this.tileLayerOptions, 'Must have a valid tile layer options and can be {}');
  }

  public static createId(name?: string): string {
    if(!name)
      return Entity.generateId(ENTITY_MODELS.SPATIAL.SPATIAL_TILE_LAYER);
    return Entity.generateId(ENTITY_MODELS.SPATIAL.SPATIAL_TILE_LAYER, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: SpatialTileLayer | Entity): SpatialTileLayer {
    let r: SpatialTileLayer = Object.assign(new SpatialTileLayer(), source);
    return r;
  }

  public static mapToEntityArray(source: SpatialTileLayer[]): SpatialTileLayer[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(r => {
      array.push(this.mapToEntity(r));
    });
    return array;
  }
}
