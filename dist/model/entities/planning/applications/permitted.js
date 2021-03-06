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
var iregistry_details_1 = require("./../iregistry-details");
var PermittedApplication = (function (_super) {
    __extends(PermittedApplication, _super);
    function PermittedApplication() {
        var _this = _super.call(this) || this;
        _this.officerComments = '';
        _this.proposedDevelopment = '';
        return _this;
    }
    PermittedApplication.prototype.validateEntity = function () { };
    return PermittedApplication;
}(iregistry_details_1.RegistryDetails));
exports.PermittedApplication = PermittedApplication;
