import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert, StringUtilities } from 'caribviper-common';

/**
 * Settings for a map
 */
export class GeoMapSettings extends Entity {
  
  /**
   * Creates a new map settings
   * @param name Name of map
   * @param description Description about map
   * @param tiles Tiles to be displayed on map and in order
   * @param features Features to be displayed on map
   */
  constructor(public name?: string, public description?: string, public tiles?: string[], public features?: string[]) {
    super(ENTITY_MODELS.GEOMETRY.GEO_MAP_SETTINGS, GeoMapSettings.createId(name), true);
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.name, 'Must have a valid name');
    Assert.isTruthy(this.tiles, 'Must have a valid set of Tiles');
    Assert.isNonEmptyArray(this.tiles, 'Tiles must have at least one tile set');
  }

  /**
   * Adds a tile
   * @param tile Tile to be added
   */
  public addTile(tile: string) {
    this.tiles = this.tiles || [];
    if (!this.tiles.indexOf(tile))
      this.tiles.push(tile);
  }

  /**
   * Removes a tile
   * @param tile Tile to be removed
   */
  public removeTile(tile: string) {
    this.tiles = this.tiles || [];
    const index = this.tiles.indexOf(tile);
    if (index > -1)
      this.tiles.splice(index, 1);
  }
  

  /**
   * Adds a feature
   * @param feature Feature to be added
   */
  public addFeature(feature: string) {
    this.features = this.features || [];
    if (!this.features.indexOf(feature))
      this.features.push(feature);
  }

  /**
   * Removes a feature
   * @param feature Feature to be removed
   */
  public removeFeature(feature: string) {
    this.features = this.features || [];
    const index = this.features.indexOf(feature);
    if (index > -1)
      this.features.splice(index, 1);
  }
  

  /**
   * Determines if a tile can be moved up
   * @param index Index position of tile to be moved
   */
  public canMoveTileUp(index: number): boolean {
    return (!!this.tiles && this.tiles.length > 1 && index > 0);
  }

  /**
   * Determines if a tile can be moved down
   * @param index Index position of tile to be moved
   */
  public canMoveTileDown(index: number): boolean {
    return (!!this.tiles && this.tiles.length > 1 && index < this.tiles.length - 1);
  }

  /**
   * Moves a tile up, if it can do so
   * @param index Index position of tile to be moved
   */
  public moveTileUp(index: number) {
    if (this.canMoveTileUp(index)) {
      [this.tiles[index - 1], this.tiles[index]] = [this.tiles[index], this.tiles[index - 1]];
    }
  }

  /**
   * Moves a tile down, if it can do so
   * @param index Index position of tile to be moved
   */
  public moveTileDown(index: number) {
    if (this.canMoveTileDown(index)) {
      [this.tiles[index], this.tiles[index + 1]] = [this.tiles[index + 1], this.tiles[index]];
    }
  }

  public static createId(name: string): string {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.GEOMETRY.GEO_TILE_LAYER);
    return Entity.generateId(ENTITY_MODELS.GEOMETRY.GEO_TILE_LAYER, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: GeoMapSettings | Entity): GeoMapSettings {
    let r: GeoMapSettings = Object.assign(new GeoMapSettings(), source);
    return r;
  }

  public static mapToEntityArray(source: GeoMapSettings[]): GeoMapSettings[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(r => {
      array.push(this.mapToEntity(r));
    });
    return array;
  }
}
