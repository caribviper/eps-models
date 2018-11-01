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
var Invest = (function (_super) {
    __extends(Invest, _super);
    function Invest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.comments = '';
        _this.directionsToSite = '';
        _this.mainInvestigation = '';
        _this.offendingAction = '';
        _this.infraction = '';
        _this.infractionStartDate = null;
        _this.infractionEndDate = null;
        return _this;
    }
    return Invest;
}(iregistry_details_1.RegistryDetails));
exports.Invest = Invest;
