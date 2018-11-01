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
var entity_model_type_1 = require("./../../entity-model-type");
var iregistry_details_1 = require("./../iregistry-details");
var descriptive_1 = require("./../../../value-objects/planning/descriptive");
var ChattelApplication = (function (_super) {
    __extends(ChattelApplication, _super);
    function ChattelApplication() {
        var _this = _super.call(this) || this;
        _this.proposedDevelopment = '';
        _this.officerComments = '';
        _this.interestInLand = new descriptive_1.InterestInLand();
        _this.currentLandUse = new descriptive_1.CategoryDescription();
        _this.proposedSewageDisposal = '';
        _this.proposedWater = '';
        _this.materials = new descriptive_1.Materials();
        _this.isFoundationSolid = false;
        _this.hasEnforcementNotice = false;
        _this.enforcementNumber = '';
        _this.interestInLand = new descriptive_1.InterestInLand();
        _this.materials = new descriptive_1.Materials();
        _this.currentLandUse = new descriptive_1.CategoryDescription('', '');
        return _this;
    }
    ChattelApplication.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isTruthy(this.interestInLand, 'Chattel interestInLand cannot be undefined');
        caribviper_common_1.Assert.isTruthy(this.materials, 'Chattel materials cannot be undefined');
        caribviper_common_1.Assert.isTruthy(this.currentLandUse, 'Chattel currentLandUse cannot be undefined');
    };
    ChattelApplication.createId = function (registryId) {
        return this.idHelper(registryId, entity_model_type_1.ENTITY_MODELS.REGISTRY_DETAILS.APPLICATIONS.CHATTEL);
    };
    ChattelApplication.mapToEntity = function (source) {
        return Object.assign(new ChattelApplication(), source);
    };
    return ChattelApplication;
}(iregistry_details_1.RegistryDetails));
exports.ChattelApplication = ChattelApplication;
