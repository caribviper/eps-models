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
var organisation_info_1 = require("../../value-objects/common/organisation-info");
var Organisation = (function (_super) {
    __extends(Organisation, _super);
    function Organisation(orgId, name, description) {
        if (orgId === void 0) { orgId = ''; }
        if (name === void 0) { name = ''; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SECURITY.ORGANISATION, Organisation.createId(orgId), true) || this;
        _this.orgId = orgId;
        _this.name = name;
        _this.description = description;
        _this.contact = undefined;
        _this.groups = [];
        _this.name = name;
        _this.description = description;
        return _this;
    }
    Organisation.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Organisation cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.orgId, 'Organisation id cannot be undefined/empty');
        caribviper_common_1.Assert.isTruthy(this.name, 'Organisation name cannot be undefined/empty');
    };
    Organisation.createId = function (orgId) {
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.ORGANISATION, orgId);
    };
    Organisation.mapToEntity = function (source) {
        return Object.assign(new Organisation(), source);
    };
    Organisation.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Organisation(), element));
        });
        return array;
    };
    Organisation.toOrganisationInfo = function (organisation) {
        if (!organisation)
            return undefined;
        return new organisation_info_1.OrganisationInfo(organisation.orgId, organisation.name);
    };
    Organisation.prototype.addGroup = function (group) {
        if (!this.groups)
            this.groups = [];
        if (!this.groups.includes(group))
            this.groups.push(group);
    };
    Organisation.prototype.removeGroup = function (group) {
        if (!this.groups)
            this.groups = [];
        var index = this.groups.indexOf(group);
        if (index > -1)
            this.groups.splice(index, 1);
    };
    return Organisation;
}(caribviper_entity_1.Entity));
exports.Organisation = Organisation;
