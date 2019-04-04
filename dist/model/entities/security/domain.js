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
var entity_model_type_1 = require("../entity-model-type");
var caribviper_entity_1 = require("caribviper-entity");
var caribviper_common_1 = require("caribviper-common");
var domain_info_1 = require("../../value-objects/common/domain-info");
var Domain = (function (_super) {
    __extends(Domain, _super);
    function Domain(code, name, description) {
        if (code === void 0) { code = ''; }
        if (name === void 0) { name = ''; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SECURITY.DOMAIN, Domain.createId(code), true) || this;
        _this.code = code;
        _this.name = name;
        _this.description = description;
        _this.contact = undefined;
        _this.groups = [];
        _this.crossDomainUsers = [];
        _this.name = name;
        _this.description = description;
        return _this;
    }
    Domain.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Domain cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.code, 'Domain code cannot be undefined/empty');
        caribviper_common_1.Assert.isTruthy(this.name, 'Domain name cannot be undefined/empty');
    };
    Domain.createId = function (code) {
        if (code === void 0) { code = ''; }
        if (!code)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.DOMAIN);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.DOMAIN, code);
    };
    Domain.mapToEntity = function (source) {
        return Object.assign(new Domain(), source);
    };
    Domain.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Domain(), element));
        });
        return array;
    };
    Domain.toDomainInfo = function (domain) {
        if (!domain)
            return undefined;
        return new domain_info_1.DomainInfo(domain._id, domain.code, domain.name);
    };
    Domain.prototype.addGroup = function (group) {
        if (!this.groups)
            this.groups = [];
        if (!this.groups.includes(group))
            this.groups.push(group);
    };
    Domain.prototype.removeGroup = function (group) {
        if (!this.groups)
            this.groups = [];
        var index = this.groups.indexOf(group);
        if (index > -1)
            this.groups.splice(index, 1);
    };
    Domain.prototype.addCrossDomainUser = function (username) {
        if (!this.crossDomainUsers)
            this.crossDomainUsers = [];
        if (!this.crossDomainUsers.includes(username))
            this.crossDomainUsers.push(username);
    };
    Domain.prototype.removeCrossDomainUser = function (username) {
        if (!this.crossDomainUsers)
            this.crossDomainUsers = [];
        var index = this.crossDomainUsers.indexOf(username);
        if (index > -1)
            this.crossDomainUsers.splice(index, 1);
    };
    return Domain;
}(caribviper_entity_1.Entity));
exports.Domain = Domain;
