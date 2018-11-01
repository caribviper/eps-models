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
var __1 = require("../../..");
var caribviper_common_1 = require("caribviper-common");
var CodeScriptItem = (function () {
    function CodeScriptItem(name, description, code) {
        this.name = name;
        this.description = description;
        this.code = code;
    }
    return CodeScriptItem;
}());
exports.CodeScriptItem = CodeScriptItem;
var CodeScripts = (function (_super) {
    __extends(CodeScripts, _super);
    function CodeScripts() {
        var _this = _super.call(this, __1.ENTITY_MODELS.SYSTEM.CODE_SCRIPT, CodeScripts.createId(), true) || this;
        _this.scripts = [];
        return _this;
    }
    CodeScripts.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
    };
    CodeScripts.prototype.sortScripts = function () {
        this.scripts = this.scripts.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            if (b.name.toLowerCase() < a.name.toLowerCase())
                return 1;
            return 0;
        });
    };
    CodeScripts.prototype.addScript = function (script) {
        if (!script || !script.name)
            return false;
        script.name = script.name.toLowerCase();
        var index = this.scripts.findIndex(function (s) { return s.name.toLowerCase() === script.name.toLowerCase(); });
        if (index > -1) {
            this.scripts[index].code = script.code;
            this.scripts[index].description = script.description;
        }
        this.scripts.push(script);
        return true;
    };
    CodeScripts.prototype.removeScript = function (name) {
        if (this.scripts.length === 0)
            return;
        var index = this.scripts.findIndex(function (s) { return s.name.toLowerCase() === name.toLowerCase(); });
        if (index < 0)
            return;
        this.scripts.splice(index, 1);
    };
    CodeScripts.prototype.clearScripts = function () {
        this.scripts = [];
    };
    CodeScripts.createId = function () {
        return caribviper_entity_1.Entity.generateId(__1.ENTITY_MODELS.SYSTEM.CODE_SCRIPT);
    };
    CodeScripts.mapToEntity = function (source) {
        return Object.assign(new CodeScripts(), source);
    };
    CodeScripts.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new CodeScripts(), element));
        });
        return array;
    };
    return CodeScripts;
}(caribviper_entity_1.Entity));
exports.CodeScripts = CodeScripts;
