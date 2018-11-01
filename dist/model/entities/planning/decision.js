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
var decision_types_1 = require("./../../value-objects/enumerators/decision-types");
var entity_model_type_1 = require("./../entity-model-type");
var caribviper_common_1 = require("caribviper-common");
var caribviper_entity_1 = require("caribviper-entity");
exports.DECISION_AUTHORITY = {
    CTP: { name: 'CTP', value: 0 },
    MINISTER: { name: 'MINISTER', value: 1 }
};
var DecisionItem = (function () {
    function DecisionItem(order, template) {
        this.order = 0;
        this.itemNumber = 0;
        this.description = '';
        this.order = order;
        if (!template)
            throw new Error('Invalid template used to create DecisionItem');
        this.templateType = template.decisionType;
        this.itemNumber = template.itemNo;
        this.description = template.description;
        this.rationale = template.rationale;
    }
    return DecisionItem;
}());
exports.DecisionItem = DecisionItem;
var DecisionProperty = (function () {
    function DecisionProperty(authority, approved, preparedBy) {
        this.approved = false;
        this.withdrawn = false;
        this.authority = authority;
        this.approved = approved;
        this.preparedBy = preparedBy;
        this.created = new Date();
    }
    Object.defineProperty(DecisionProperty.prototype, "isFinalised", {
        get: function () { return !!this.signed; },
        enumerable: true,
        configurable: true
    });
    DecisionProperty.prototype.ensureNotFinalised = function () {
        if (this.isFinalised)
            throw new Error('Cannot finalised Decision as it has already been finalised');
    };
    DecisionProperty.prototype.dispatch = function (ctpUser) {
        if (!this.isFinalised)
            throw new Error('Cannot dispatch as deicison is not finalised');
        this.dispatched = new Date();
        this.dispatchingUser = ctpUser;
    };
    DecisionProperty.prototype.sign = function (ctpUser) {
        if (ctpUser === void 0) { ctpUser = undefined; }
        this.ensureNotFinalised();
        this.signed = new Date();
        if (!!ctpUser)
            this.signingUser = ctpUser;
    };
    DecisionProperty.prototype.loggedAppeal = function (appealDate) {
        if (this.isFinalised)
            this.appealed = appealDate;
    };
    DecisionProperty.prototype.validateProperty = function () {
        caribviper_common_1.Assert.isTruthy(this.authority, 'Decision Property authority cannot be undefined/empty');
        caribviper_common_1.Assert.isTruthy(this.preparedBy, 'Decision Property preparedBy cannot be undefined/empty');
        caribviper_common_1.Assert.isTruthy(this.created, 'Decision Property created date cannot be undefined/empty');
    };
    return DecisionProperty;
}());
exports.DecisionProperty = DecisionProperty;
var Decision = (function (_super) {
    __extends(Decision, _super);
    function Decision(registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.DECISION, Decision.createId(registryId, guid), true) || this;
        _this.properties = new DecisionProperty('', false, null);
        _this.decisionItems = [];
        _this.forceNewLineForConditions = true;
        _this.forceNewLineForConditionsReasons = true;
        _this.forceNewLineForClause = true;
        _this.forceNewLineForRefusals = true;
        _this.registryId = registryId;
        _this.decisionItems = [];
        _this.properties = new DecisionProperty('', false, null);
        return _this;
    }
    Decision.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Decision cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Decision registryId cannot be undefined/empty');
        this.properties.validateProperty();
    };
    Object.defineProperty(Decision.prototype, "approved", {
        get: function () {
            return !!this.properties && this.properties.approved && !this.properties.withdrawn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Decision.prototype, "withdrawn", {
        get: function () {
            return !!this.properties && this.properties.withdrawn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Decision.prototype, "finalised", {
        get: function () {
            return !!this.properties && this.finalised;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Decision.prototype, "conditions", {
        get: function () {
            var items = [];
            if (!this.decisionItems || this.decisionItems.length < 1)
                return items;
            this.decisionItems.forEach(function (item) {
                if (item.templateType === decision_types_1.DECISION_TYPES.STANDARD_CONDITION ||
                    item.templateType === decision_types_1.DECISION_TYPES.CUSTOM_CONDITION ||
                    item.templateType === decision_types_1.DECISION_TYPES.STANDARD_CONDITION_TREE ||
                    item.templateType === decision_types_1.DECISION_TYPES.CUSTOM_CONDITION_TREE) {
                    items.push(item);
                }
            });
            items.sort(function (a, b) {
                if (a.order !== b.order)
                    return a.order - b.order;
                return a.itemNumber - b.itemNumber;
            });
            return items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Decision.prototype, "clauses", {
        get: function () {
            var items = [];
            if (!this.decisionItems || this.decisionItems.length < 1)
                return items;
            this.decisionItems.forEach(function (item) {
                if (item.templateType === decision_types_1.DECISION_TYPES.CLAUSE ||
                    item.templateType === decision_types_1.DECISION_TYPES.CUSTOM_CLAUSE) {
                    items.push(item);
                }
            });
            items.sort(function (a, b) {
                if (a.order !== b.order)
                    return a.order - b.order;
                return a.itemNumber - b.itemNumber;
            });
            return items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Decision.prototype, "refusals", {
        get: function () {
            var items = [];
            if (!this.decisionItems || this.decisionItems.length < 1)
                return items;
            this.decisionItems.forEach(function (item) {
                if (item.templateType === decision_types_1.DECISION_TYPES.REASON_FOR_REFUSAL ||
                    item.templateType === decision_types_1.DECISION_TYPES.CUSTOM_REASON_FOR_REFUSAL ||
                    item.templateType === decision_types_1.DECISION_TYPES.REASON_FOR_REFUSAL_TREE ||
                    item.templateType === decision_types_1.DECISION_TYPES.CUSTOM_REASON_FOR_REFUSAL_TREE) {
                    items.push(item);
                }
            });
            items.sort(function (a, b) {
                if (a.order !== b.order)
                    return a.order - b.order;
                return a.itemNumber - b.itemNumber;
            });
            return items;
        },
        enumerable: true,
        configurable: true
    });
    Decision.prototype.sortDecisionItems = function () {
        this.decisionItems.sort(function (a, b) {
            if (a.order !== b.order)
                return a.order - b.order;
            return a.itemNumber - b.itemNumber;
        });
    };
    Decision.createNew = function (registryId, guid, approved, preparedBy) {
        var d = new Decision(registryId, guid);
        d.properties = new DecisionProperty(exports.DECISION_AUTHORITY.CTP.name, approved, preparedBy);
        d.decisionItems = [];
        return d;
    };
    Decision.createId = function (registryId, guid) {
        if (guid === void 0) { guid = ''; }
        if (!guid)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.DECISION);
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.DECISION, guid);
    };
    Decision.mapToEntity = function (source) {
        var decision = Object.assign(new Decision(), source);
        decision.properties = Object.assign(new DecisionProperty('', false, null), decision.properties);
        return decision;
    };
    Decision.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Decision(), element));
        });
        return array;
    };
    return Decision;
}(caribviper_entity_1.Entity));
exports.Decision = Decision;
