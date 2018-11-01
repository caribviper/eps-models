"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_common_1 = require("caribviper-common");
var DateRange = (function () {
    function DateRange(date, days) {
        this.date = date;
        this.days = days;
        caribviper_common_1.Assert.isTruthy(date, 'DateRange date cannot be undefined');
        caribviper_common_1.Assert.isTruthy(days, 'DateRange days cannot be undefined');
        caribviper_common_1.Assert.isTrue(days > 0, 'DateRange days cannot be less than 1');
    }
    return DateRange;
}());
exports.DateRange = DateRange;
