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
var Favourite = (function (_super) {
    __extends(Favourite, _super);
    function Favourite(referenceNo, registryId, username) {
        if (referenceNo === void 0) { referenceNo = ''; }
        if (registryId === void 0) { registryId = ''; }
        if (username === void 0) { username = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.GENERAL.FAVOURITE, Favourite.createId(username, registryId), true) || this;
        _this.referenceNo = referenceNo;
        _this.registryId = registryId;
        _this.username = username;
        return _this;
    }
    Favourite.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Favourite cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.referenceNo, 'Favourite reference number cannot be null/empty');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Favourite registry id cannot be null');
        caribviper_common_1.Assert.isTruthy(this.username, 'Favourite username cannot be null');
    };
    Favourite.createId = function (username, registryId) {
        if (registryId === void 0) { registryId = ''; }
        if (!username)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GENERAL.FAVOURITE);
        if (!!username && !registryId)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GENERAL.FAVOURITE, username);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GENERAL.FAVOURITE, username, registryId);
    };
    Favourite.mapToEntity = function (source) {
        var favourite = Object.assign(new Favourite(), source);
        return favourite;
    };
    Favourite.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Favourite(), element));
        });
        return array;
    };
    return Favourite;
}(caribviper_entity_1.Entity));
exports.Favourite = Favourite;
