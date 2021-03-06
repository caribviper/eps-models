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
var projection_1 = require("./../common/projection");
var __1 = require("../../..");
var GeoSpatialRegistryProperty = (function (_super) {
    __extends(GeoSpatialRegistryProperty, _super);
    function GeoSpatialRegistryProperty() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formalType = '';
        return _this;
    }
    GeoSpatialRegistryProperty.createFromRegistry = function (registry) {
        var p = new GeoSpatialRegistryProperty();
        p.area = registry.area;
        p.description = registry.projection.description;
        p.primaryContact = registry.projection.primaryContact;
        p.secondaryContact = registry.projection.secondaryContact;
        p.location = registry.projection.location;
        p.referenceNo = registry.referenceNo;
        p.registryId = registry._id;
        p.fileType = registry.fileType.displayName;
        p.landTax = registry.location.landTaxNo;
        p.parcel = registry.location.parcel;
        p.area = registry.area;
        p.status = this.getStatus(registry);
        switch (registry.fileType.folderPrefix) {
            case __1.RegistryFileTypes.enforcement.folderPrefix:
            case __1.RegistryFileTypes.enquiry.folderPrefix:
            case __1.RegistryFileTypes.complaint.folderPrefix:
            case __1.RegistryFileTypes.unauthorised.folderPrefix: {
                p.landUse = 'ENFORCEMENT';
                break;
            }
            case __1.RegistryFileTypes.formal.folderPrefix: {
                var formal = registry.details;
                p.formalType = formal.formalType;
                p.landUse = formal.proposedPrimaryLandUse.category;
                p.siteArea = formal.measurements.areaOfSite;
                break;
            }
            case __1.RegistryFileTypes.permitted.folderPrefix:
            case __1.RegistryFileTypes.chattel.folderPrefix: {
                p.landUse = 'RESIDENTIAL';
                break;
            }
            default: {
                p.landUse = 'OTHER';
                break;
            }
        }
        return p;
    };
    GeoSpatialRegistryProperty.getStatus = function (registry) {
        var value = 'N/A';
        if (!!registry && !!registry.status)
            value = __1.FileStatusFactory.convertToStringStatus(registry.status) || registry.status;
        return value;
    };
    return GeoSpatialRegistryProperty;
}(projection_1.Projection));
exports.GeoSpatialRegistryProperty = GeoSpatialRegistryProperty;
