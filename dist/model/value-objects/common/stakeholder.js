"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contact_1 = require("./contact");
exports.STAKEHOLDER_TYPES = {
    APPLICANT: 'applicant',
    APPLICANT_SECONDARY: 'applicant secondary',
    AGENT: 'agent',
    COMPLAINANT: 'complainant',
    OFFENDER: 'offender',
    OWNER: 'owner',
    OCCUPIER: 'occupier',
    NOTICEE: 'notice recipient',
    THIRD_PARTY: 'third party',
    INTERESTED_PARTY: 'interested party',
    IGNORE: 'ignore contact',
    ASSOCIATED_ORGANISATION: 'associated organisation',
    AGENCY: 'government agency'
};
var Stakeholder = (function () {
    function Stakeholder(contact, stakeholderType, secondaryType) {
        if (secondaryType === void 0) { secondaryType = ''; }
        this.contact = contact;
        this.stakeholderType = stakeholderType;
        this.secondaryType = secondaryType;
    }
    Object.defineProperty(Stakeholder.prototype, "isEmpty", {
        get: function () {
            return (!this.contact || contact_1.Contact.isEmpty(this.contact));
        },
        enumerable: true,
        configurable: true
    });
    Stakeholder.prototype.stringifyContact = function () {
        return this.contact.firstname + " " + this.contact.lastname;
    };
    Stakeholder.isEmpty = function (stakeholder) {
        return !stakeholder || !stakeholder.contact || contact_1.Contact.isEmpty(stakeholder.contact);
    };
    return Stakeholder;
}());
exports.Stakeholder = Stakeholder;
