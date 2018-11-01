"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeeItem = (function () {
    function FeeItem(fee, receiptNo, feeWaived) {
        if (fee === void 0) { fee = 0; }
        if (receiptNo === void 0) { receiptNo = '000000'; }
        if (feeWaived === void 0) { feeWaived = false; }
        this.fee = fee;
        this.receiptNo = receiptNo;
        this.feeWaived = feeWaived;
    }
    return FeeItem;
}());
exports.FeeItem = FeeItem;
