"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CategoryDescription = (function () {
    function CategoryDescription(category, description) {
        if (category === void 0) { category = ''; }
        if (description === void 0) { description = ''; }
        this.category = category;
        this.description = description;
    }
    return CategoryDescription;
}());
exports.CategoryDescription = CategoryDescription;
var CommercialDescription = (function () {
    function CommercialDescription() {
        this.isIndustry = false;
        this.businessDescription = '';
        this.disposalOfRefuse = '';
        this.estimatedWaterUsage = null;
        this.estimatedElectricityUsage = null;
        this.estimatedEmployees = null;
        this.hazardousMaterialDescription = '';
    }
    Object.defineProperty(CommercialDescription.prototype, "involvesHazardousMaterial", {
        get: function () { return this.hazardousMaterialDescription ? true : false; },
        enumerable: true,
        configurable: true
    });
    return CommercialDescription;
}());
exports.CommercialDescription = CommercialDescription;
var ConstructionType = (function () {
    function ConstructionType(isNew, isAddition, description) {
        this.isNew = isNew;
        this.isAddition = isAddition;
        this.description = description;
    }
    return ConstructionType;
}());
exports.ConstructionType = ConstructionType;
var InterestInLand = (function () {
    function InterestInLand() {
        this.interestInLandCategory = '';
        this.interestInLandCategoryId = 0;
        this.description = '';
        this.hasOwnersConsent = false;
        this.boundByConvenants = false;
    }
    return InterestInLand;
}());
exports.InterestInLand = InterestInLand;
var Materials = (function () {
    function Materials() {
        this.wall = 'NONE';
        this.roofCovering = 'NONE';
        this.roofSupportOrFloor = 'NONE';
        this.roofCoveringOther = 'NONE';
    }
    return Materials;
}());
exports.Materials = Materials;
