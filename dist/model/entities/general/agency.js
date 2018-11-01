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
var caribviper_entity_1 = require("caribviper-entity");
var entity_model_type_1 = require("./../entity-model-type");
var contact_1 = require("../../value-objects/common/contact");
var Agency = (function (_super) {
    __extends(Agency, _super);
    function Agency(contact, guid) {
        if (contact === void 0) { contact = ''; }
        if (guid === void 0) { guid = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.AGENCY, Agency.createId(guid), true) || this;
        _this.isGovernment = false;
        _this.consulting = false;
        _this.code = '';
        if (typeof contact !== 'string') {
            _this.contact = contact;
        }
        else {
            _this.contact = new contact_1.Contact();
            _this.contact.company = contact;
        }
        _this.code = guid;
        return _this;
    }
    Agency.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Agent cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.contact, 'Contact cannot be undefined');
        caribviper_common_1.Assert.isTruthy(this.contact.company, 'Company name cannot be empty/undefined');
        caribviper_common_1.Assert.isTruthy(this.contact.address, 'Must have a valid address');
    };
    Agency.createId = function (guid) {
        if (guid === void 0) { guid = undefined; }
        if (!guid)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.PLANNING.AGENCY);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.PLANNING.AGENCY, guid);
    };
    Agency.mapToEntity = function (source) {
        return Object.assign(new Agency(), source);
    };
    Agency.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Agency(), element));
        });
        return array;
    };
    return Agency;
}(caribviper_entity_1.Entity));
exports.Agency = Agency;
