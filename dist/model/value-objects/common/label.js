"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
exports.LABEL_ADDRESS_TYPES = { APPLICANT: 0, AGENT: 1, LAND: 2, CUSTOM: 3 };
var Label = (function () {
    function Label(contact, referenceNo, displayName, description, dateReceived) {
        if (referenceNo === void 0) { referenceNo = ''; }
        if (displayName === void 0) { displayName = ''; }
        if (description === void 0) { description = ''; }
        if (dateReceived === void 0) { dateReceived = null; }
        this.contact = contact;
        this.referenceNo = referenceNo;
        this.displayName = displayName;
        this.description = description;
        this.dateReceived = dateReceived;
        this.showReferenceNo = true;
        this.showDisplayName = true;
        this.showDescription = true;
        this.index = 0;
    }
    Object.defineProperty(Label.prototype, "isNewRow", {
        get: function () {
            return this.index % 2 === 0;
        },
        enumerable: true,
        configurable: true
    });
    return Label;
}());
exports.Label = Label;
var LabelSettings = (function () {
    function LabelSettings() {
        this.addressType = exports.LABEL_ADDRESS_TYPES.LAND;
        this.referenceNo = '';
        this.start_row = 0;
        this.start_col = 0;
        this.isRange = false;
        this.fileType = '';
    }
    LabelSettings.RangeSearch = function (startDate, endDate, copies, start_row, start_col) {
        if (copies === void 0) { copies = 4; }
        if (start_row === void 0) { start_row = 0; }
        if (start_col === void 0) { start_col = 0; }
        var settings = new LabelSettings;
        settings.addressType = exports.LABEL_ADDRESS_TYPES.LAND;
        settings.isRange = true;
        settings.startDate = !startDate ? moment().subtract(1, 'day').toDate() : startDate;
        settings.endDate = !endDate ? moment(settings.startDate).add(1, 'day').toDate() : endDate;
        settings.copies = copies < 1 ? 4 : copies;
        settings.start_row = start_row < 0 ? 0 : start_row;
        settings.start_col = start_col < 0 ? 0 : start_col;
        if (settings.startDate.getTime() > settings.endDate.getTime()) {
            settings.startDate = moment().subtract(1, 'day').toDate();
            settings.endDate = moment(settings.startDate).add(1, 'day').toDate();
        }
        return settings;
    };
    LabelSettings.ReferenceSearch = function (referenceNo, addressType, copies, start_row, start_col) {
        if (addressType === void 0) { addressType = exports.LABEL_ADDRESS_TYPES.APPLICANT; }
        if (copies === void 0) { copies = 4; }
        if (start_row === void 0) { start_row = 0; }
        if (start_col === void 0) { start_col = 0; }
        var settings = new LabelSettings();
        settings.referenceNo = referenceNo;
        settings.addressType = addressType < 0 || addressType > 2 ? exports.LABEL_ADDRESS_TYPES.APPLICANT : addressType;
        settings.copies = copies < 1 ? 4 : copies;
        settings.start_row = start_row < 0 ? 0 : start_row;
        settings.start_col = start_col < 0 ? 0 : start_col;
        return settings;
    };
    LabelSettings.CustomLabel = function (copies, start_row, start_col) {
        if (copies === void 0) { copies = 4; }
        if (start_row === void 0) { start_row = 0; }
        if (start_col === void 0) { start_col = 0; }
        var settings = new LabelSettings();
        settings.addressType = exports.LABEL_ADDRESS_TYPES.CUSTOM;
        settings.copies = copies < 1 ? 4 : copies;
        settings.start_row = start_row < 0 ? 0 : start_row;
        settings.start_col = start_col < 0 ? 0 : start_col;
        return settings;
    };
    return LabelSettings;
}());
exports.LabelSettings = LabelSettings;
