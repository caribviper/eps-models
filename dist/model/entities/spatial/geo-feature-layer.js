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
var caribviper_common_1 = require("caribviper-common");
var entity_model_type_1 = require("./../entity-model-type");
var caribviper_entity_1 = require("caribviper-entity");
var GeoFeatureLayer = (function (_super) {
    __extends(GeoFeatureLayer, _super);
    function GeoFeatureLayer(name, featureCollection, popUpContent) {
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_FEATURE_LAYER, GeoFeatureLayer.createId(name), true) || this;
        _this.name = name;
        _this.featureCollection = featureCollection;
        _this.popUpContent = popUpContent;
        _this.show = false;
        _this.description = '';
        _this.featureStyles = [];
        return _this;
    }
    GeoFeatureLayer.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'Must have a valid name');
        caribviper_common_1.Assert.isTruthy(this.featureCollection, 'Must have a valid FeatureCollection');
    };
    GeoFeatureLayer.createId = function (name) {
        if (name === void 0) { name = ''; }
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_FEATURE_LAYER);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GEOMETRY.GEO_FEATURE_LAYER, name);
    };
    GeoFeatureLayer.mapToEntity = function (source) {
        var r = Object.assign(new GeoFeatureLayer(), source);
        return r;
    };
    GeoFeatureLayer.mapToEntityArray = function (source) {
        var _this = this;
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (r) {
            array.push(_this.mapToEntity(r));
        });
        return array;
    };
    return GeoFeatureLayer;
}(caribviper_entity_1.Entity));
exports.GeoFeatureLayer = GeoFeatureLayer;
