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
var SpatialFeatureLayer = (function (_super) {
    __extends(SpatialFeatureLayer, _super);
    function SpatialFeatureLayer(name, featureCollection, popUpContent) {
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER, SpatialFeatureLayer.createId(name), true) || this;
        _this.name = name;
        _this.featureCollection = featureCollection;
        _this.popUpContent = popUpContent;
        _this.show = false;
        _this.description = '';
        _this.featureStyles = [];
        return _this;
    }
    SpatialFeatureLayer.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'Must have a valid name');
        caribviper_common_1.Assert.isTruthy(this.featureCollection, 'Must have a valid FeatureCollection');
    };
    SpatialFeatureLayer.prototype.addFeatureStyle = function (featureStyle) {
        this.featureStyles = this.featureStyles || [];
        if (!this.featureStyles.findIndex(function (f) { return f.name === featureStyle.name; }))
            this.featureStyles.push(featureStyle);
    };
    SpatialFeatureLayer.prototype.removeFeature = function (featureStyle) {
        this.featureStyles = this.featureStyles || [];
        var index = this.featureStyles.findIndex(function (f) { return f.name === featureStyle.name; });
        if (index > -1)
            this.featureStyles.splice(index, 1);
    };
    SpatialFeatureLayer.prototype.canMoveFeatureStyleUp = function (index) {
        return (!!this.featureStyles && this.featureStyles.length > 1 && index > 0);
    };
    SpatialFeatureLayer.prototype.canMoveFeatureStyleDown = function (index) {
        return (!!this.featureStyles && this.featureStyles.length > 1 && index < this.featureStyles.length - 1);
    };
    SpatialFeatureLayer.prototype.moveFeatureStyleUp = function (index) {
        if (this.canMoveFeatureStyleUp(index)) {
            _a = [this.featureStyles[index], this.featureStyles[index - 1]], this.featureStyles[index - 1] = _a[0], this.featureStyles[index] = _a[1];
        }
        var _a;
    };
    SpatialFeatureLayer.prototype.moveFeatureStyleDown = function (index) {
        if (this.canMoveFeatureStyleDown(index)) {
            _a = [this.featureStyles[index + 1], this.featureStyles[index]], this.featureStyles[index] = _a[0], this.featureStyles[index + 1] = _a[1];
        }
        var _a;
    };
    SpatialFeatureLayer.prototype.filterFeatureStyle = function (value) {
        var style;
        for (var i = 0; i < this.featureStyles.length; i++) {
            var temp = this.featureStyles[i];
            if (value === undefined || this.featureStyles.length === 1) {
                style = temp;
                break;
            }
            else if (!temp.predicate && !!temp.properties && Object.keys(temp.properties).length > 0) {
                style = temp;
                break;
            }
            else if (!!temp.predicate) {
                if (!!temp.predicate.match && !!temp.predicate.property) {
                    var property = temp.predicate.property;
                    if (value[property] !== undefined && value[property] === temp.predicate.match) {
                        style = temp;
                        break;
                    }
                }
            }
        }
        return style;
    };
    SpatialFeatureLayer.createId = function (name) {
        if (name === void 0) { name = ''; }
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER, name);
    };
    SpatialFeatureLayer.mapToEntity = function (source) {
        var r = Object.assign(new SpatialFeatureLayer(), source);
        return r;
    };
    SpatialFeatureLayer.mapToEntityArray = function (source) {
        var _this = this;
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (r) {
            array.push(_this.mapToEntity(r));
        });
        return array;
    };
    return SpatialFeatureLayer;
}(caribviper_entity_1.Entity));
exports.SpatialFeatureLayer = SpatialFeatureLayer;
