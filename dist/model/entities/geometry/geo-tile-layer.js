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
var GeoTileLayer = (function (_super) {
    __extends(GeoTileLayer, _super);
    function GeoTileLayer(name, description, templateUrl, tileLayerOptions) {
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_TILE_LAYER, GeoTileLayer.createId(name), true) || this;
        _this.name = name;
        _this.description = description;
        _this.templateUrl = templateUrl;
        _this.tileLayerOptions = tileLayerOptions;
        return _this;
    }
    GeoTileLayer.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'Must have a valid name');
        caribviper_common_1.Assert.isTruthy(this.templateUrl, 'Must have a valid template url');
        caribviper_common_1.Assert.isTruthy(this.tileLayerOptions, 'Must have a valid tile layer options and can be {}');
    };
    GeoTileLayer.createId = function (name) {
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_TILE_LAYER);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_TILE_LAYER, name);
    };
    GeoTileLayer.mapToEntity = function (source) {
        var r = Object.assign(new GeoTileLayer(), source);
        return r;
    };
    GeoTileLayer.mapToEntityArray = function (source) {
        var _this = this;
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (r) {
            array.push(_this.mapToEntity(r));
        });
        return array;
    };
    return GeoTileLayer;
}(caribviper_entity_1.Entity));
exports.GeoTileLayer = GeoTileLayer;
