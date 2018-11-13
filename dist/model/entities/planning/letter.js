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
var caribviper_entity_1 = require("caribviper-entity");
var caribviper_common_1 = require("caribviper-common");
var __1 = require("../../..");
var Letter = (function (_super) {
    __extends(Letter, _super);
    function Letter(guid, registryId, content, creator) {
        if (guid === void 0) { guid = ''; }
        if (registryId === void 0) { registryId = ''; }
        if (content === void 0) { content = ''; }
        if (creator === void 0) { creator = null; }
        var _this = _super.call(this, __1.ENTITY_MODELS.PLANNING.LETTER, Letter.createId(registryId, guid), true) || this;
        _this.registryId = registryId;
        _this.content = content;
        _this.creator = creator;
        _this.created = null;
        _this.signed = null;
        _this.dispatched = null;
        _this.updated = null;
        _this.subject = '';
        _this.owner = null;
        _this.templateName = '';
        _this.templateId = '';
        _this.description = '';
        _this.salutation = '';
        _this.valediction = '';
        _this.carbonCopy = '';
        _this.formFields = {};
        _this.created = new Date();
        _this.updated = _this.created;
        _this.attachedPictures = [];
        _this.contacts = [];
        return _this;
    }
    Letter.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Letter cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Letter must have a valid registry id');
        caribviper_common_1.Assert.isTruthy(this.content, 'Letter must have valid content');
    };
    Object.defineProperty(Letter.prototype, "hasPictures", {
        get: function () {
            return !!this.attachedPictures && this.attachedPictures.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Letter.prototype.canSign = function (username) {
        return this.owner.username === username && !this.signed;
    };
    Letter.prototype.sign = function (username) {
        if (this.canSign(username))
            this.signed = new Date();
    };
    Letter.prototype.canDispatch = function () {
        return !!this.signed;
    };
    Letter.prototype.dispatch = function (user) {
        if (this.canDispatch()) {
            this.dispatched = new Date();
            this.ddispatchingUser = user;
        }
    };
    Letter.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId)
            return '';
        if (!guid)
            return caribviper_entity_1.Entity.generateId(registryId, __1.ENTITY_MODELS.PLANNING.LETTER);
        return caribviper_entity_1.Entity.generateId(registryId, __1.ENTITY_MODELS.PLANNING.LETTER, guid);
    };
    Letter.mapToEntity = function (source) {
        var o = Object.assign(new Letter(), source);
        return o;
    };
    Letter.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            var o = Object.assign(new Letter(), element);
            array.push(o);
        });
        return array;
    };
    return Letter;
}(caribviper_entity_1.Entity));
exports.Letter = Letter;
