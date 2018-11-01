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
var entity_model_type_1 = require("../entity-model-type");
var caribviper_common_1 = require("caribviper-common");
var ConvertionItem = (function (_super) {
    __extends(ConvertionItem, _super);
    function ConvertionItem(lastUpdate) {
        if (lastUpdate === void 0) { lastUpdate = new Date(); }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.CONVERSION.UPDATE, ConvertionItem.createId(), true) || this;
        _this.lastUpdate = new Date();
        return _this;
    }
    ConvertionItem.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Agent cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.lastUpdate, 'Last update cannot be undefined');
    };
    ConvertionItem.createId = function () {
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.CONVERSION.UPDATE);
    };
    ConvertionItem.mapToEntity = function (source) {
        return Object.assign(new ConvertionItem(), source);
    };
    ConvertionItem.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new ConvertionItem(), element));
        });
        return array;
    };
    return ConvertionItem;
}(caribviper_entity_1.Entity));
exports.ConvertionItem = ConvertionItem;
