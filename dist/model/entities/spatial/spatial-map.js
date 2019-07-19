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
var spatial_data_1 = require("../../value-objects/spatial/spatial-data");
var CustomMapControls = (function () {
    function CustomMapControls() {
        this.hasSideBar = true;
        this.hasDrawingControlBar = true;
        this.hasLegend = true;
    }
    return CustomMapControls;
}());
exports.CustomMapControls = CustomMapControls;
var SpatialMapOptions = (function () {
    function SpatialMapOptions() {
        this.zoomControl = true;
        this.controls = new CustomMapControls();
    }
    return SpatialMapOptions;
}());
exports.SpatialMapOptions = SpatialMapOptions;
var SpatialMap = (function (_super) {
    __extends(SpatialMap, _super);
    function SpatialMap(name, description, layers) {
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_MAP, SpatialMap.createId(name), true) || this;
        _this.name = name;
        _this.description = description;
        _this.layers = layers;
        _this.options = {
            zoomControl: false,
            maxZoom: 19,
            minZoom: 10,
            zoom: 15,
            bounds: [[13.014294693510667, -59.801473199443855], [13.340127231898112, -59.261435936746146]],
            center: [13.080873414866646, -59.60453689098359],
            controls: new CustomMapControls()
        };
        _this.domains = [];
        _this.layers = layers || [];
        _this.domains = [];
        return _this;
    }
    SpatialMap.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'Must have a valid name');
        caribviper_common_1.Assert.isTruthy(this.layers, 'Must have a valid set of Layers');
        caribviper_common_1.Assert.isNonEmptyArray(this.layers, 'Tiles must have at least one tile set');
    };
    Object.defineProperty(SpatialMap.prototype, "tiles", {
        get: function () {
            var _tiles = [];
            this.layers.forEach(function (l) {
                if (l.type === spatial_data_1.GROUP_MAP_LAYER_TYPE.TILE)
                    _tiles.push(l);
            });
            return _tiles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpatialMap.prototype, "features", {
        get: function () {
            var _features = [];
            this.layers.forEach(function (l) {
                if (l.type === spatial_data_1.GROUP_MAP_LAYER_TYPE.FEATURE)
                    _features.push(l);
            });
            return _features;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpatialMap.prototype, "featuresSorted", {
        get: function () {
            var _features = [];
            this.layers.forEach(function (l) {
                if (l.type === spatial_data_1.GROUP_MAP_LAYER_TYPE.FEATURE)
                    _features.push(l);
            });
            return _features.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y)
                    return -1;
                if (y < x)
                    return 1;
                return 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpatialMap.prototype, "baseMapName", {
        get: function () {
            if (!!this.baseMapTile)
                return this.baseMapTile;
            if (this.tiles.length > 0)
                return this.tiles[0].name;
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpatialMap.prototype, "baseMap", {
        get: function () {
            var _this = this;
            if (this.layers.length < 0)
                return undefined;
            return this.layers.find(function (t) { return t.name === _this.baseMapName && t.type === spatial_data_1.GROUP_MAP_LAYER_TYPE.TILE; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpatialMap.prototype, "dataLayer", {
        get: function () {
            if (this.dataLayerIndex < 0 || this.dataLayerIndex > this.features.length)
                return undefined;
            return this.features[this.dataLayerIndex];
        },
        enumerable: true,
        configurable: true
    });
    SpatialMap.prototype.addLayer = function (layer) {
        this.layers = this.layers || [];
        if (!this.layers.findIndex(function (t) { return t.name === layer.name; })) {
            this.layers.push(layer);
        }
    };
    SpatialMap.prototype.removeLayer = function (layer) {
        this.layers = this.layers || [];
        var index = this.layers.findIndex(function (tileSetting) { return tileSetting.name === layer; });
        if (index > -1)
            this.layers.splice(index, 1);
    };
    Object.defineProperty(SpatialMap.prototype, "groupLayerNames", {
        get: function () {
            var group = [];
            this.layers.forEach(function (l) {
                if (!!l.group && group.indexOf(l.group) < 0)
                    group.push(l.group);
                else {
                    group.push(l.name);
                }
            });
            return group;
        },
        enumerable: true,
        configurable: true
    });
    SpatialMap.prototype.canMoveLayerUp = function (index) {
        return (!!this.layers && this.layers.length > 1 && index > 0);
    };
    SpatialMap.prototype.canMoveLayerDown = function (index) {
        return (!!this.layers && this.layers.length > 1 && index < this.layers.length - 1);
    };
    SpatialMap.prototype.moveLayerUp = function (index) {
        var _a;
        if (this.canMoveLayerUp(index)) {
            _a = [this.layers[index], this.layers[index - 1]], this.layers[index - 1] = _a[0], this.layers[index] = _a[1];
        }
    };
    SpatialMap.prototype.moveLayerDown = function (index) {
        var _a;
        if (this.canMoveLayerDown(index)) {
            _a = [this.layers[index + 1], this.layers[index]], this.layers[index] = _a[0], this.layers[index + 1] = _a[1];
        }
    };
    SpatialMap.createId = function (name) {
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_MAP);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_MAP, name);
    };
    SpatialMap.mapToEntity = function (source) {
        var r = Object.assign(new SpatialMap(), source);
        return r;
    };
    SpatialMap.mapToEntityArray = function (source) {
        var _this = this;
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (r) {
            array.push(_this.mapToEntity(r));
        });
        return array;
    };
    return SpatialMap;
}(caribviper_entity_1.Entity));
exports.SpatialMap = SpatialMap;
