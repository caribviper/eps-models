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
var UserToken = (function (_super) {
    __extends(UserToken, _super);
    function UserToken(id, idHasType) {
        if (id === void 0) { id = ''; }
        if (idHasType === void 0) { idHasType = false; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SECURITY.USER_TOKEN, id, idHasType) || this;
        _this.valid = true;
        _this.dateCreated = new Date();
        _this.dateCreated = new Date();
        return _this;
    }
    UserToken.prototype.hasExpired = function () { return !!this.expires ? this.expires < Date.now() : true; };
    UserToken.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Entity cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.username, 'Username cannot be null/empty');
        caribviper_common_1.Assert.isTruthy(this.expires, 'Expiration date cannot be null');
        caribviper_common_1.Assert.isTruthy(this.token, 'Token cannot be null');
    };
    UserToken.createNew = function (data) {
        return Object.assign(new UserToken(this.createId(data.username, data.expires), true), data);
    };
    UserToken.createId = function (username, expires) {
        if (expires === void 0) { expires = 0; }
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.USER_TOKEN, username, expires < 1 ? '' : expires.toString());
    };
    UserToken.mapToEntity = function (source) {
        return Object.assign(new UserToken(), source);
    };
    UserToken.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new UserToken(), element));
        });
        return array;
    };
    return UserToken;
}(caribviper_entity_1.Entity));
exports.UserToken = UserToken;
