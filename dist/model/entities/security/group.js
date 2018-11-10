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
var Group = (function (_super) {
    __extends(Group, _super);
    function Group(groupName, description, pooled) {
        if (groupName === void 0) { groupName = ''; }
        if (description === void 0) { description = ''; }
        if (pooled === void 0) { pooled = false; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SECURITY.GROUP, Group.createId(groupName), true) || this;
        _this.pooled = false;
        _this.resources = [];
        _this.groupName = groupName;
        _this.description = description;
        _this.pooled = pooled;
        return _this;
    }
    Group.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Group cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.groupName, 'Group name cannot be undefined/empty');
    };
    Group.createId = function (groupName) {
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.GROUP, groupName);
    };
    Group.mapToEntity = function (source) {
        return Object.assign(new Group(), source);
    };
    Group.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Group(), element));
        });
        return array;
    };
    Group.prototype.ensureResoureInitialised = function () {
        if (!this.resources)
            this.resources = [];
    };
    Group.prototype.addResource = function (resourceId) {
        this.ensureResoureInitialised();
        if (!resourceId)
            return;
        if (!this.resources.includes(resourceId))
            this.resources.push(resourceId);
    };
    Group.prototype.removeResource = function (resourceId) {
        this.ensureResoureInitialised();
        if (!resourceId)
            return;
        var index = this.resources.findIndex(function (r) { return r === resourceId; });
        if (index > -1)
            this.resources.splice(index, 1);
    };
    return Group;
}(caribviper_entity_1.Entity));
exports.Group = Group;
