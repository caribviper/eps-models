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
var RegistryLogEntry = (function (_super) {
    __extends(RegistryLogEntry, _super);
    function RegistryLogEntry(registryId, eventDate, description, category) {
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.REGISTRY_LOG_ENTRY, RegistryLogEntry.createId(registryId, eventDate)) || this;
        _this.registryId = registryId;
        _this.eventDate = eventDate;
        _this.description = description;
        _this.category = category;
        return _this;
    }
    RegistryLogEntry.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Registry log cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Registry log must have a valid registry id');
        caribviper_common_1.Assert.isTruthy(this.eventDate, 'Registry log must have a valid event date');
        caribviper_common_1.Assert.isTruthy(this.eventDate, 'Registry log must have a valid description');
    };
    RegistryLogEntry.createId = function (registryId, eventDate) {
        if (!registryId)
            return '';
        if (!eventDate)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.SYSTEM.REGISTRY_LOG_ENTRY);
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.SYSTEM.REGISTRY_LOG_ENTRY, eventDate.toString());
    };
    RegistryLogEntry.mapToEntity = function (source) {
        var o = Object.assign(new RegistryLogEntry(), source);
        return o;
    };
    RegistryLogEntry.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            var o = Object.assign(new RegistryLogEntry(), element);
            array.push(o);
        });
        return array;
    };
    return RegistryLogEntry;
}(caribviper_entity_1.Entity));
exports.RegistryLogEntry = RegistryLogEntry;
