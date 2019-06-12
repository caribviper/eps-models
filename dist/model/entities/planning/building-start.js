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
var dispatched_info_1 = require("./../../value-objects/common/dispatched-info");
var fee_item_1 = require("./../../value-objects/common/fee-item");
var entity_model_type_1 = require("./../entity-model-type");
var contact_1 = require("./../../value-objects/common/contact");
var caribviper_common_1 = require("caribviper-common");
var caribviper_entity_1 = require("caribviper-entity");
var BuildingStart = (function (_super) {
    __extends(BuildingStart, _super);
    function BuildingStart(registryId, guid, commencementDate) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (commencementDate === void 0) { commencementDate = null; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.BUILDING_START, BuildingStart.createId(registryId, guid)) || this;
        _this.buildingNo = '';
        _this.lotNumber = '';
        _this.comments = '';
        _this.documentId = '';
        _this.registryId = '';
        _this.fees = new fee_item_1.FeeItem();
        _this.mailingAddress = new contact_1.Contact();
        _this.dispatchedInfo = null;
        _this.constructionStarted = false;
        _this.completed = false;
        _this.registryId = registryId;
        _this.commencementDate = commencementDate;
        return _this;
    }
    Object.defineProperty(BuildingStart.prototype, "isCertified", {
        get: function () {
            return !!this.certificationDate;
        },
        enumerable: true,
        configurable: true
    });
    BuildingStart.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Certificate cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Certificate requires a valid registry item id');
    };
    BuildingStart.prototype.certify = function (certifiedDate, certifiedBy) {
        this.certificationDate = certifiedDate;
        this.certifiedBy = certifiedBy;
    };
    Object.defineProperty(BuildingStart.prototype, "canDispatch", {
        get: function () {
            return this.isCertified && !this.dispatchedInfo;
        },
        enumerable: true,
        configurable: true
    });
    BuildingStart.prototype.dispatch = function (user, dispatchedDate, description) {
        if (!this.canDispatch)
            return;
        this.dispatchedInfo = new dispatched_info_1.DispatchedInfo(user, dispatchedDate, description);
    };
    BuildingStart.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId || !guid)
            return '';
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.BUILDING_START, guid);
    };
    BuildingStart.mapToEntity = function (source) {
        return Object.assign(new BuildingStart(), source);
    };
    BuildingStart.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new BuildingStart(), element));
        });
        return array;
    };
    return BuildingStart;
}(caribviper_entity_1.Entity));
exports.BuildingStart = BuildingStart;
