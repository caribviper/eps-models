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
var DispatchedItemContainer = (function () {
    function DispatchedItemContainer(dispatchedItem, reference) {
        this.dispatchedItem = dispatchedItem;
        this.reference = reference;
    }
    return DispatchedItemContainer;
}());
exports.DispatchedItemContainer = DispatchedItemContainer;
var DispatchedItem = (function (_super) {
    __extends(DispatchedItem, _super);
    function DispatchedItem(registryId, dispatchedDate, referencedId, user, itemType, description) {
        if (registryId === void 0) { registryId = ''; }
        if (dispatchedDate === void 0) { dispatchedDate = null; }
        if (referencedId === void 0) { referencedId = ''; }
        if (user === void 0) { user = null; }
        if (itemType === void 0) { itemType = null; }
        if (description === void 0) { description = null; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.DISPATCHED_ITEM, DispatchedItem.createId(registryId, (!user ? '' : user.username), dispatchedDate), true) || this;
        _this.registryId = registryId;
        _this.dispatchedDate = dispatchedDate;
        _this.referencedId = referencedId;
        _this.user = user;
        _this.itemType = itemType;
        _this.description = description;
        return _this;
    }
    DispatchedItem.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Dispatched item cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Dispatched item registryId cannot be undefined/empty');
        caribviper_common_1.Assert.isTruthy(this.dispatchedDate, 'Dispateched item date cannot be null');
        caribviper_common_1.Assert.isTruthy(this.user, 'Dispatched item user cannot be null');
        caribviper_common_1.Assert.isTruthy(this.description, 'Dispatched item description cannot be null');
    };
    DispatchedItem.createId = function (registryId, username, dispatchedDate) {
        if (username === void 0) { username = ''; }
        if (dispatchedDate === void 0) { dispatchedDate = null; }
        if (!dispatchedDate && !username)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.DISPATCHED_ITEM);
        if (!!username && !dispatchedDate)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.DISPATCHED_ITEM, username);
        else
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.DISPATCHED_ITEM, username, dispatchedDate.getTime().toString());
    };
    DispatchedItem.mapToEntity = function (source) {
        return Object.assign(new DispatchedItem(), source);
    };
    DispatchedItem.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new DispatchedItem(), element));
        });
        return array;
    };
    return DispatchedItem;
}(caribviper_entity_1.Entity));
exports.DispatchedItem = DispatchedItem;
