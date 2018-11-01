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
var DecisionItemTemplate = (function (_super) {
    __extends(DecisionItemTemplate, _super);
    function DecisionItemTemplate(decisionType, itemNo, description, rationale) {
        if (decisionType === void 0) { decisionType = ''; }
        if (itemNo === void 0) { itemNo = undefined; }
        if (description === void 0) { description = ''; }
        if (rationale === void 0) { rationale = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE, DecisionItemTemplate.createId(decisionType, itemNo), true) || this;
        _this.decisionType = decisionType;
        _this.itemNo = itemNo;
        _this.description = description;
        _this.rationale = rationale;
        return _this;
    }
    DecisionItemTemplate.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'DecisionItemTemplate cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.decisionType, 'DecisionItemTemplate deisionType cannot be undefined/empty');
        caribviper_common_1.Assert.isTruthy(this.itemNo, 'DecisionItemTemplate itemNo cannot be undefined/empty');
        caribviper_common_1.Assert.isTrue(this.itemNo >= 1, 'DecisionItemTemplate itemNo cannot be less than 1');
        caribviper_common_1.Assert.isTruthy(this.description, 'DecisionItemTemplate description cannot be undefined/empty');
    };
    DecisionItemTemplate.createId = function (decisionType, itemNo) {
        if (decisionType === void 0) { decisionType = ''; }
        if (itemNo === void 0) { itemNo = -1; }
        if (!decisionType)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE);
        else if (!itemNo || itemNo < 1)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE, decisionType);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE, decisionType, itemNo.toString());
    };
    DecisionItemTemplate.mapToEntity = function (source) {
        var template = Object.assign(new DecisionItemTemplate(), source);
        try {
            if (typeof template.itemNo != 'number')
                template.itemNo = parseInt(template.itemNo);
        }
        catch (error) {
            template.itemNo = 0;
        }
        return template;
    };
    DecisionItemTemplate.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new DecisionItemTemplate(), element));
        });
        return array;
    };
    return DecisionItemTemplate;
}(caribviper_entity_1.Entity));
exports.DecisionItemTemplate = DecisionItemTemplate;
