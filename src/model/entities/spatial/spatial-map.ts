import { UserInfo } from './../../value-objects/common/userinfo';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';
import { GroupMapLayerItem, GROUP_MAP_LAYER_TYPE } from '../../value-objects/spatial/spatial-data';

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

  /**Advance controls options*/
  controls: any = {};
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
    center: [13.080873414866646, -59.60453689098359],
    controls: {}
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

  /**Make map public */
  public: boolean;

  /**
   * Creates a new map
   * @param name Name of map
   * @param description Description about map
   * @param layers Tiles to be displayed on map and in order
   */
  constructor(public name?: string, public description?: string, public layers?: GroupMapLayerItem[]) {
    super(ENTITY_MODELS.SPATIAL.SPATIAL_MAP, SpatialMap.createId(name), true);
    this.layers = layers || [];
    this.domains = [];
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.name, 'Must have a valid name');
    Assert.isTruthy(this.layers, 'Must have a valid set of Layers');
    Assert.isNonEmptyArray(this.layers, 'Tiles must have at least one tile set');
  }

  /**
   * Get all tiles
   */
  get tiles(): GroupMapLayerItem[] {
    const _tiles: GroupMapLayerItem[] = [];
    this.layers.forEach(l => {
      if (l.type === GROUP_MAP_LAYER_TYPE.TILE)
        _tiles.push(l);
    });
    return _tiles;
  }

  /**
   * Get all features
   */
  get features(): GroupMapLayerItem[] {
    const _features: GroupMapLayerItem[] = [];
    this.layers.forEach(l => {
      if (l.type === GROUP_MAP_LAYER_TYPE.FEATURE)
        _features.push(l);
    });
    return _features;
  }

  get featuresSorted(): GroupMapLayerItem[] {
    const _features: GroupMapLayerItem[] = [];
    this.layers.forEach(l => {
      if (l.type === GROUP_MAP_LAYER_TYPE.FEATURE)
        _features.push(l);
    });
    
    return _features.sort((a: GroupMapLayerItem, b: GroupMapLayerItem) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    });

  }

  /**
   * Get the base map tile name to be used
   */
  get baseMapName(): string {
    if (!!this.baseMapTile)
      return this.baseMapTile;
    if (this.tiles.length > 0)
      return this.tiles[0].name;
    return '';
  }

  /**
   * Gets the base map tile
   */
  get baseMap(): GroupMapLayerItem {
    if (this.layers.length < 0)
      return undefined;
    return this.layers.find(t => t.name === this.baseMapName && t.type === GROUP_MAP_LAYER_TYPE.TILE);
  }


  /**
   * Gets the specified data layer
   */
  public get dataLayer(): GroupMapLayerItem {
    if (this.dataLayerIndex < 0 || this.dataLayerIndex > this.features.length)
      return undefined;
    return this.features[this.dataLayerIndex];
  }

  /**
   * Adds a layer
   * @param layer Layer to be added
   */
  public addLayer(layer: GroupMapLayerItem) {
    this.layers = this.layers || [];
    if (!this.layers.findIndex(t => t.name === layer.name)) {
      this.layers.push(layer)
    }
  }

  /**
   * Removes a layer
   * @param layer Layer to be removed
   */
  public removeLayer(layer: string) {
    this.layers = this.layers || [];
    const index = this.layers.findIndex(tileSetting => tileSetting.name === layer);
    if (index > -1)
      this.layers.splice(index, 1);
  }

  /**
   * Get all groups layers within map
   */
  public get groupLayerNames(): string[] {
    const group: string[] = [];
    this.layers.forEach(l => {
      if (!!l.group && group.indexOf(l.group) < 0)
        group.push(l.group);
      else {
        group.push(l.name);
      }
    });
    return group;
  }


  /**
   * Determines if a layer can be moved up
   * @param index Index position of layer to be moved
   */
  public canMoveLayerUp(index: number): boolean {
    return (!!this.layers && this.layers.length > 1 && index > 0);
  }

  /**
   * Determines if a layer can be moved down
   * @param index Index position of layer to be moved
   */
  public canMoveLayerDown(index: number): boolean {
    return (!!this.layers && this.layers.length > 1 && index < this.layers.length - 1);
  }

  /**
   * Moves a layer up, if it can do so
   * @param index Index position of layer to be moved
   */
  public moveLayerUp(index: number) {
    if (this.canMoveLayerUp(index)) {
      [this.layers[index - 1], this.layers[index]] = [this.layers[index], this.layers[index - 1]];
    }
  }

  /**
   * Moves a layer down, if it can do so
   * @param index Index position of layer to be moved
   */
  public moveLayerDown(index: number) {
    if (this.canMoveLayerDown(index)) {
      [this.layers[index], this.layers[index + 1]] = [this.layers[index + 1], this.layers[index]];
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
