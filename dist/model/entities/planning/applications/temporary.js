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
var caribviper_common_1 = require("caribviper-common");
exports.TEMPORARY_DEVELOPMENT_TYPE = {
    ENTERTAINMENT: 'Public Entertainment Licence',
    BANNER: 'Erection Banner',
    TENT: 'Erection of a Tent or Other Temporary Structure'
};
var TemporaryDevelopment = (function (_super) {
    __extends(TemporaryDevelopment, _super);
    function TemporaryDevelopment(type, dates, referenceNo) {
        if (type === void 0) { type = ''; }
        if (dates === void 0) { dates = []; }
        if (referenceNo === void 0) { referenceNo = ''; }
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.dates = dates;
        _this.referenceNo = referenceNo;
        return _this;
    }
    TemporaryDevelopment.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isTruthy(this.type, 'Temporary Development type cannot be undefined/empty');
        caribviper_common_1.Assert.isNonEmptyArray(this.dates, 'Temporary Development dates cannot be undefined/empty');
    };
    return TemporaryDevelopment;
}(iregistry_details_1.RegistryDetails));
exports.TemporaryDevelopment = TemporaryDevelopment;
