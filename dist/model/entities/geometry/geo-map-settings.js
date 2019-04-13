"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var entity_model_type_1 = require("./../entity-model-type");
var caribviper_entity_1 = require("caribviper-entity");
var caribviper_common_1 = require("caribviper-common");
var GeoMapSettings = (function (_super) {
    __extends(GeoMapSettings, _super);
    function GeoMapSettings(name, description, tiles, features) {
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_MAP_SETTINGS, GeoMapSettings.createId(name), true) || this;
        _this.name = name;
        _this.description = description;
        _this.tiles = tiles;
        _this.features = features;
        _this.options = {
            zoomControl: false,
            maxZoom: 19,
            minZoom: 10,
            zoom: 15,
            bounds: [[13.014294693510667, -59.801473199443855], [13.340127231898112, -59.261435936746146]],
            center: [13.080873414866646, -59.60453689098359]
        };
        return _this;
    }
    GeoMapSettings.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'Must have a valid name');
        caribviper_common_1.Assert.isTruthy(this.tiles, 'Must have a valid set of Tiles');
        caribviper_common_1.Assert.isNonEmptyArray(this.tiles, 'Tiles must have at least one tile set');
    };
    GeoMapSettings.prototype.addTile = function (tile) {
        this.tiles = this.tiles || [];
        if (!this.tiles.indexOf(tile))
            this.tiles.push(tile);
    };
    GeoMapSettings.prototype.removeTile = function (tile) {
        this.tiles = this.tiles || [];
        var index = this.tiles.indexOf(tile);
        if (index > -1)
            this.tiles.splice(index, 1);
    };
    GeoMapSettings.prototype.addFeature = function (feature) {
        this.features = this.features || [];
        if (!this.features.indexOf(feature))
            this.features.push(feature);
    };
    GeoMapSettings.prototype.removeFeature = function (feature) {
        this.features = this.features || [];
        var index = this.features.indexOf(feature);
        if (index > -1)
            this.features.splice(index, 1);
    };
    GeoMapSettings.prototype.canMoveTileUp = function (index) {
        return (!!this.tiles && this.tiles.length > 1 && index > 0);
    };
    GeoMapSettings.prototype.canMoveTileDown = function (index) {
        return (!!this.tiles && this.tiles.length > 1 && index < this.tiles.length - 1);
    };
    GeoMapSettings.prototype.moveTileUp = function (index) {
        if (this.canMoveTileUp(index)) {
            _a = [this.tiles[index], this.tiles[index - 1]], this.tiles[index - 1] = _a[0], this.tiles[index] = _a[1];
        }
        var _a;
    };
    GeoMapSettings.prototype.moveTileDown = function (index) {
        if (this.canMoveTileDown(index)) {
            _a = [this.tiles[index + 1], this.tiles[index]], this.tiles[index] = _a[0], this.tiles[index + 1] = _a[1];
        }
        var _a;
    };
    GeoMapSettings.createId = function (name) {
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_TILE_LAYER);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_TILE_LAYER, name);
    };
    GeoMapSettings.mapToEntity = function (source) {
        var r = Object.assign(new GeoMapSettings(), source);
        return r;
    };
    GeoMapSettings.mapToEntityArray = function (source) {
        var _this = this;
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (r) {
            array.push(_this.mapToEntity(r));
        });
        return array;
    };
    return GeoMapSettings;
}(caribviper_entity_1.Entity));
exports.GeoMapSettings = GeoMapSettings;
