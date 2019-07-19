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
var caribviper_entity_1 = require("caribviper-entity");
var __1 = require("../../..");
var caribviper_common_1 = require("caribviper-common");
var SpatialParcel = (function (_super) {
    __extends(SpatialParcel, _super);
    function SpatialParcel(feature) {
        var _this = _super.call(this, __1.ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER, SpatialParcel.createId(), true) || this;
        _this.feature = feature;
        return _this;
    }
    SpatialParcel.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.feature, 'Must have a valid feature');
    };
    SpatialParcel.createId = function (name) {
        if (name === void 0) { name = ''; }
        return caribviper_entity_1.Entity.generateId(__1.ENTITY_MODELS.SPATIAL.SPATIAL_PARCEL);
    };
    SpatialParcel.mapToEntity = function (source) {
        var r = Object.assign(new SpatialParcel(), source);
        return r;
    };
    SpatialParcel.mapToEntityArray = function (source) {
        var _this = this;
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (r) {
            array.push(_this.mapToEntity(r));
        });
        return array;
    };
    return SpatialParcel;
}(caribviper_entity_1.Entity));
exports.SpatialParcel = SpatialParcel;
