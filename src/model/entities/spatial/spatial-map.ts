import { UserInfo } from './../../value-objects/common/userinfo';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';
import { FeatureMapSetting } from '../../value-objects/spatial/spatial-data';

export class SpatialMapOptions {
  /** Zoom control */
  zoomControl: boolean;

  /**
   * Maximum zoom
   */
  maxZoom: number;

  /**
   * Minimum zoom
   */
  minZoom: number;

  /**
   * Starting zoom
   */
  zoom: number;

  /** Bounds of map. Lower left bounds to upper right bounds */
  bounds: [number, number][];

  /**Center point */
  center: [number, number];
}

/**
 * Manages a map
 */
export class SpatialMap extends Entity {

  /**Store map setting options */
  public options: SpatialMapOptions = {
    zoomControl: false,
    maxZoom: 19,
    minZoom: 10,
    zoom: 15,
    bounds: [[13.014294693510667, -59.801473199443855], [13.340127231898112, -59.261435936746146]],
    center: [13.080873414866646, -59.60453689098359]
  };

  /**
   * Indicates the index position of the layer that should get the data.
   * Only one layer can exists
   * Layer must also have no data within its layer 
   **/
  dataLayerIndex: number;

  /**List of allowed domains to view map */
  domains: string[] = [];

  /**Person who designed map */
  createdBy: UserInfo;

  /** Last modified by */
  lastModifiedBy: UserInfo;

  /**Date created */
  created: Date;

  /**Date last modified */
  modified: Date;

  /**Specifies which map to use as the base map*/
  baseMapTile: string;

  /**
   * Creates a new map
   * @param name Name of map
   * @param description Description about map
   * @param tiles Tiles to be displayed on map and in order
   * @param features Features to be displayed on map
   */
  constructor(public name?: string, public description?: string, public tiles?: string[], public features?: FeatureMapSetting[]) {
    super(ENTITY_MODELS.SPATIAL.SPATIAL_MAP, SpatialMap.createId(name), true);
    this.tiles = tiles || [];
    this.features = features || [];
    this.domains = [];
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.name, 'Must have a valid name');
    Assert.isTruthy(this.tiles, 'Must have a valid set of Tiles');
    Assert.isNonEmptyArray(this.tiles, 'Tiles must have at least one tile set');
  }

  /**
   * Get the base map tile to be used
   */
  get baseMap(): string {
    if (!!this.baseMapTile)
      return this.baseMapTile;
    if (this.tiles.length > 0)
      return this.tiles[0];
    return '';
  }

  /**
   * Gets the specified data layer
   */
  public get dataLayer(): FeatureMapSetting {
    if (this.dataLayerIndex < 0 || this.dataLayerIndex > this.features.length)
      return undefined;
    return this.features[this.dataLayerIndex];
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
  public addFeature(feature: FeatureMapSetting) {
    this.features = this.features || [];
    if (!this.features.findIndex(f => f.name === feature.name))
      this.features.push(feature);
  }

  /**
   * Removes a feature
   * @param feature Feature to be removed
   */
  public removeFeature(feature: FeatureMapSetting) {
    this.features = this.features || [];
    const index = this.features.findIndex(f => f.name === feature.name);
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

  public static createId(name?: string): string {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.SPATIAL.SPATIAL_MAP);
    return Entity.generateId(ENTITY_MODELS.SPATIAL.SPATIAL_MAP, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: SpatialMap | Entity): SpatialMap {
    let r: SpatialMap = Object.assign(new SpatialMap(), source);
    return r;
  }

  public static mapToEntityArray(source: SpatialMap[]): SpatialMap[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(r => {
      array.push(this.mapToEntity(r));
    });
    return array;
  }
}
