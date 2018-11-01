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
var descriptive_1 = require("./../../../value-objects/planning/descriptive");
var measurement_1 = require("./../../../value-objects/planning/measurement");
var FormalApplication = (function (_super) {
    __extends(FormalApplication, _super);
    function FormalApplication() {
        var _this = _super.call(this) || this;
        _this.retention = false;
        _this.proposedDevelopment = new descriptive_1.CategoryDescription();
        _this.formalType = '';
        _this.interestInLand = new descriptive_1.InterestInLand();
        _this.proposedPrimaryLandUse = new descriptive_1.CategoryDescription();
        _this.proposedSecondaryLandUse = new descriptive_1.CategoryDescription();
        _this.currentLandUse = new descriptive_1.CategoryDescription();
        _this.hasEnforcementNotice = false;
        _this.enforcementNumber = '';
        _this.constructionTypes = [];
        _this.measurements = new measurement_1.Measurements();
        _this.lotsToBeCreated = null;
        _this.constructionOfRoad = false;
        _this.onCoastline = false;
        _this.referenceNo = '';
        _this.referenceApprovalDate = null;
        _this.commercialDescription = new descriptive_1.CommercialDescription();
        _this.proposedWaterSource = 'NONE';
        _this.existingWaterSource = 'NONE';
        _this.proposedSewageDisposal = 'NONE';
        _this.existingSewageDisposal = 'NONE';
        _this.materials = new descriptive_1.Materials();
        _this.floorSpaceDescription = new measurement_1.FloorSpaceMeasurement();
        _this.storeysCreated = 0;
        _this.buildingHeight = null;
        _this.numberOfUnitsToBeErected = 0;
        _this.numberOfBedrooms = 0;
        _this.maximumSeatingCapacity = 0;
        _this.officerComments = 'N/A';
        _this.outlineApplication = false;
        _this.interestInLand = new descriptive_1.InterestInLand();
        _this.materials = new descriptive_1.Materials();
        _this.currentLandUse = new descriptive_1.CategoryDescription('', '');
        return _this;
    }
    Object.defineProperty(FormalApplication.prototype, "hasReferenceNo", {
        get: function () { return this.referenceNo ? true : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormalApplication.prototype, "isSection18", {
        get: function () {
            return (this.onCoastline ||
                (this.proposedPrimaryLandUse.category === 'AGRICULTURE' && this.measurements.areaOfSite > 8093.7128448));
        },
        enumerable: true,
        configurable: true
    });
    FormalApplication.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isTruthy(this.interestInLand, 'Formal interestInLand cannot be undefined');
        caribviper_common_1.Assert.isTruthy(this.materials, 'Formal materials cannot be undefined');
        caribviper_common_1.Assert.isTruthy(this.currentLandUse, 'Formal currentLandUse cannot be undefined');
        caribviper_common_1.Assert.isTruthy(this.formalType, 'Formal formalType cannot be undefined/empty');
    };
    return FormalApplication;
}(iregistry_details_1.RegistryDetails));
exports.FormalApplication = FormalApplication;
