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
var ApplicationCounter = (function (_super) {
    __extends(ApplicationCounter, _super);
    function ApplicationCounter(year, applicationType, counter, registryId) {
        if (year === void 0) { year = 0; }
        if (applicationType === void 0) { applicationType = ''; }
        if (counter === void 0) { counter = 0; }
        if (registryId === void 0) { registryId = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, ApplicationCounter.createId(year, applicationType, counter), true) || this;
        _this.year = year;
        _this.applicationType = applicationType;
        _this.counter = counter;
        _this.registryId = registryId;
        return _this;
    }
    ApplicationCounter.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'ApplicationCounter cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.applicationType, 'ApplicationCounter applicationType cannot be undefined/empty');
        caribviper_common_1.Assert.isTruthy(this.year, 'ApplicationCounter year cannot be undefined/empty');
        caribviper_common_1.Assert.isTrue(this.year > 0, 'ApplicationCounter year cannot be less than 1');
        caribviper_common_1.Assert.isTruthy(this.counter, 'ApplicationCounter counter cannot be undefined');
        caribviper_common_1.Assert.isTrue(this.counter > 0, 'ApplicationCounter counter cannot be less than 1');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'ApplicationCounter registry cannot be undefined/empty');
    };
    ApplicationCounter.createId = function (year, applicationType, counter) {
        if (applicationType === void 0) { applicationType = ''; }
        if (counter === void 0) { counter = 0; }
        if (year < 1)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER);
        if (!applicationType)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, year.toString());
        if (counter < 1)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, year.toString(), applicationType.toLowerCase());
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, year.toString(), applicationType.toLowerCase(), counter.toString());
    };
    ApplicationCounter.mapToEntity = function (source) {
        return Object.assign(new ApplicationCounter(), source);
    };
    ApplicationCounter.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new ApplicationCounter(), element));
        });
        return array;
    };
    return ApplicationCounter;
}(caribviper_entity_1.Entity));
exports.ApplicationCounter = ApplicationCounter;
