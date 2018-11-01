"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FloorSpaceMeasurement = (function () {
    function FloorSpaceMeasurement() {
        this.retail = 0;
        this.office = 0;
        this.institutional = 0;
        this.warehouse = 0;
        this.industrial = 0;
        this.commonArea = 0;
    }
    return FloorSpaceMeasurement;
}());
exports.FloorSpaceMeasurement = FloorSpaceMeasurement;
var Measurements = (function () {
    function Measurements() {
        this.areaOfSite = 0;
        this.grossFloorArea = 0;
        this.grossRoofArea = 0;
    }
    return Measurements;
}());
exports.Measurements = Measurements;
