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
var RefreshToken = (function (_super) {
    __extends(RefreshToken, _super);
    function RefreshToken(username, tokenHash, expiresTimestamp) {
        if (username === void 0) { username = ''; }
        if (tokenHash === void 0) { tokenHash = ''; }
        if (expiresTimestamp === void 0) { expiresTimestamp = undefined; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SECURITY.REFRESH_TOKEN, username) || this;
        _this.username = username;
        _this.tokenHash = tokenHash;
        _this.expiresTimestamp = expiresTimestamp;
        _this.valid = true;
        _this.dateCreated = new Date();
        _this.dateCreated = new Date();
        return _this;
    }
    RefreshToken.prototype.hasExpired = function () { return !!this.expiresTimestamp ? this.expiresTimestamp < Date.now() : true; };
    RefreshToken.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Entity cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.username, 'Username cannot be null/empty');
        caribviper_common_1.Assert.isTruthy(this.expiresTimestamp, 'Expiration date cannot be null');
        caribviper_common_1.Assert.isTruthy(this.tokenHash, 'Token cannot be null');
    };
    RefreshToken.createId = function (username) {
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.REFRESH_TOKEN, username);
    };
    RefreshToken.mapToEntity = function (source) {
        return Object.assign(new RefreshToken(), source);
    };
    RefreshToken.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new RefreshToken(), element));
        });
        return array;
    };
    return RefreshToken;
}(caribviper_entity_1.Entity));
exports.RefreshToken = RefreshToken;
