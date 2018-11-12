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
var userinfo_1 = require("./../../value-objects/common/userinfo");
var entity_model_type_1 = require("./../entity-model-type");
var caribviper_entity_1 = require("caribviper-entity");
var caribviper_common_1 = require("caribviper-common");
var User = (function (_super) {
    __extends(User, _super);
    function User(username, firstname, lastname, email) {
        if (username === void 0) { username = ''; }
        if (firstname === void 0) { firstname = ''; }
        if (lastname === void 0) { lastname = ''; }
        if (email === void 0) { email = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SECURITY.USER, username) || this;
        _this.email = '';
        _this.disabled = false;
        _this.groups = [];
        _this.supervisorGroups = [];
        _this.securityLevel = 1;
        _this.organisation = '';
        _this.passwordHash = '';
        _this.username = username;
        _this.firstname = firstname;
        _this.lastname = lastname;
        _this.email = email;
        _this.disabled = false;
        _this.lastLoggedOn = null;
        _this.groups = [];
        _this.supervisorGroups = [];
        _this.securityLevel = 1;
        return _this;
    }
    Object.defineProperty(User.prototype, "fullname", {
        get: function () {
            return this.firstname + ' ' + this.lastname;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isTruthy(this.username, 'Invalid username. User name cannot be null/empty');
        caribviper_common_1.Assert.isTruthy(this.firstname, 'Invalid firstname. First name cannot be null/empty');
        caribviper_common_1.Assert.isTruthy(this.lastname, 'Invalid last. Last name cannot be null/empty');
    };
    User.prototype.addGroup = function () {
        var _this = this;
        var groupNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            groupNames[_i] = arguments[_i];
        }
        if (!groupNames || groupNames.length < 1)
            return;
        groupNames.forEach(function (group) {
            if (_this.groups.findIndex(function (g) { return g.toLowerCase() === group.toLowerCase(); }) < 0)
                _this.groups.push(group);
        });
    };
    User.prototype.removeGroup = function (groupName) {
        var index = this.groups.findIndex(function (g) { return g === groupName; });
        if (index > -1)
            this.groups.splice(index, 1);
    };
    User.prototype.addSupervisorGroup = function () {
        var _this = this;
        var groupNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            groupNames[_i] = arguments[_i];
        }
        if (!groupNames || groupNames.length < 1)
            return;
        groupNames.forEach(function (group) {
            if (_this.supervisorGroups.findIndex(function (g) { return g === group; }) < 0)
                _this.supervisorGroups.push(group);
        });
    };
    User.prototype.removeSupervisorGroup = function (groupName) {
        var index = this.supervisorGroups.findIndex(function (g) { return g === groupName; });
        if (index > -1)
            this.supervisorGroups.splice(index, 1);
    };
    User.createId = function (username) {
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.USER, username);
    };
    User.mapToEntity = function (source) {
        return Object.assign(new User(), source);
    };
    User.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new User(), element));
        });
        return array;
    };
    User.toUserInfo = function (user) {
        return new userinfo_1.UserInfo(user.username, user.firstname + ' ' + user.lastname);
    };
    return User;
}(caribviper_entity_1.Entity));
exports.User = User;
