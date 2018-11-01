"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PolicyItem = (function () {
    function PolicyItem() {
    }
    return PolicyItem;
}());
exports.PolicyItem = PolicyItem;
var AttachedPicture = (function () {
    function AttachedPicture(attachmentId, filename, caption) {
        if (caption === void 0) { caption = ''; }
        this.attachmentId = attachmentId;
        this.filename = filename;
        this.caption = caption;
    }
    return AttachedPicture;
}());
exports.AttachedPicture = AttachedPicture;
var SiteReportMeasurementGroup = (function () {
    function SiteReportMeasurementGroup() {
        this.existing_North = 0;
        this.existing_South = 0;
        this.existing_East = 0;
        this.existing_West = 0;
        this.proposed_North = 0;
        this.proposed_South = 0;
        this.proposed_East = 0;
        this.proposed_West = 0;
        this.prescribed_North = 0;
        this.prescribed_South = 0;
        this.prescribed_East = 0;
        this.prescribed_West = 0;
    }
    return SiteReportMeasurementGroup;
}());
exports.SiteReportMeasurementGroup = SiteReportMeasurementGroup;
