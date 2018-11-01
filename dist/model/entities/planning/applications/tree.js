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
var iregistry_details_1 = require("./../iregistry-details");
var KillTreeApplication = (function (_super) {
    __extends(KillTreeApplication, _super);
    function KillTreeApplication() {
        var _this = _super.call(this) || this;
        _this.numberOfTrees = 0;
        _this.typeOfTrees = '';
        _this.reasonForKilling = '';
        _this.directionsToSite = '';
        _this.officerComments = '';
        return _this;
    }
    KillTreeApplication.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isTruthy(this.numberOfTrees, 'KillTreeApplication number of trees cannot be undefined');
        caribviper_common_1.Assert.isTrue(this.numberOfTrees > 0, 'KillTreeApplication number of trees cannot be less than 1');
        caribviper_common_1.Assert.isTruthy(this.reasonForKilling, 'KillTreeApplication reason for killing cannot be undefined/empty');
    };
    return KillTreeApplication;
}(iregistry_details_1.RegistryDetails));
exports.KillTreeApplication = KillTreeApplication;
