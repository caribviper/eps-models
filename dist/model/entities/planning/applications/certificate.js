"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatched_info_1 = require("./../../../value-objects/common/dispatched-info");
var BondedWarehouseInformation = (function () {
    function BondedWarehouseInformation(floorSpace, materialsStored) {
        if (floorSpace === void 0) { floorSpace = 0; }
        if (materialsStored === void 0) { materialsStored = ''; }
        this.floorSpace = floorSpace;
        this.materialsStored = materialsStored;
    }
    return BondedWarehouseInformation;
}());
exports.BondedWarehouseInformation = BondedWarehouseInformation;
var Certificate = (function () {
    function Certificate() {
        this.subdivisionReferenceNo = '';
        this.applicationReferenceNo = '';
        this.lot = '';
        this.comments = '';
        this.documentId = '';
        this.registryId = '';
        this.certificateType = '';
        this.proposedDevelopment = '';
        this.fullCertificate = false;
        this.dispatchedInfo = null;
    }
    Object.defineProperty(Certificate.prototype, "isCertified", {
        get: function () {
            return !!this.certificationDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Certificate.prototype, "canDispatch", {
        get: function () {
            return this.isCertified && !this.dispatchedInfo;
        },
        enumerable: true,
        configurable: true
    });
    Certificate.prototype.certify = function (certifiedDate, certifiedBy) {
        this.certificationDate = certifiedDate;
        this.certifiedBy = certifiedBy;
    };
    Certificate.prototype.dispatch = function (user, dispatchedDate, description) {
        if (!this.canDispatch)
            return;
        this.dispatchedInfo = new dispatched_info_1.DispatchedInfo(user, dispatchedDate, description);
    };
    return Certificate;
}());
exports.Certificate = Certificate;
