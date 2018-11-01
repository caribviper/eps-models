"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Projection = (function () {
    function Projection(version, location, primaryContact, secondaryContact, description) {
        if (version === void 0) { version = ''; }
        if (location === void 0) { location = ''; }
        if (primaryContact === void 0) { primaryContact = ''; }
        if (secondaryContact === void 0) { secondaryContact = ''; }
        if (description === void 0) { description = ""; }
        this.version = version;
        this.location = location;
        this.primaryContact = primaryContact;
        this.secondaryContact = secondaryContact;
        this.description = description;
    }
    return Projection;
}());
exports.Projection = Projection;
