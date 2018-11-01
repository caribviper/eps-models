"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_common_1 = require("caribviper-common");
var address_1 = require("./address");
exports.OrganisationTitleValues = ['COMPANY', 'BARBADOS ASSOCIATION', 'THE GENERAL MANAGER', 'THE MANAGER', 'THE REGISTRAR'];
var Contact = (function () {
    function Contact(address, company, firstname, lastname, title, email, telephone, mobile) {
        if (address === void 0) { address = new address_1.Address('', ''); }
        if (company === void 0) { company = ''; }
        if (firstname === void 0) { firstname = ''; }
        if (lastname === void 0) { lastname = ''; }
        if (title === void 0) { title = ''; }
        if (email === void 0) { email = ''; }
        if (telephone === void 0) { telephone = ''; }
        if (mobile === void 0) { mobile = ''; }
        this.address = address;
        this.company = company;
        this.firstname = firstname;
        this.lastname = lastname;
        this.title = title;
        this.email = email;
        this.telephone = telephone;
        this.mobile = mobile;
    }
    Object.defineProperty(Contact.prototype, "isEmpty", {
        get: function () {
            return (!this.address || this.address.isEmpty) && !this.company && !this.lastname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "isCompany", {
        get: function () {
            return Contact.isContactCompany(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "fullname", {
        get: function () {
            return Contact.getFullname(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "fullnameWithTitle", {
        get: function () {
            return Contact.getFullnameWithTitle(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "fullnameWithTitleCapitalise", {
        get: function () {
            return caribviper_common_1.StringUtilities.capitalize(Contact.getFullnameWithTitle(this));
        },
        enumerable: true,
        configurable: true
    });
    Contact.prototype.clone = function () {
        return Contact.clone(this);
    };
    Contact.isEmpty = function (c) {
        return (!c.address || c.address.isEmpty) && !c.company && !c.lastname;
    };
    Contact.clone = function (contact) {
        if (!contact)
            return null;
        if (!contact.address)
            return new Contact(null, contact.company, contact.firstname, contact.lastname, contact.title, contact.email, contact.telephone, contact.mobile);
        var a = new address_1.Address(contact.address.parish, contact.address.streetOne, contact.address.streetTwo, contact.address.lot, contact.address.country, contact.address.postalCode);
        a.inCareOf = contact.address.inCareOf;
        var c = new Contact(a, contact.company, contact.firstname, contact.lastname, contact.title, contact.email, contact.telephone, contact.mobile);
        return c;
    };
    Contact.getFullname = function (c) {
        var f = '';
        var fullnameAlias = caribviper_common_1.StringUtilities.replaceAll(c.firstname + " " + c.middleName + " " + c.lastname, '  ', ' ');
        if (!!c.company && c.company !== fullnameAlias)
            f = c.company;
        if (!!c.firstname) {
            f = (f.length > 0) ? f.concat(', ', c.firstname) : c.firstname;
        }
        if (!!c.lastname) {
            if (!c.firstname) {
                if (exports.OrganisationTitleValues.indexOf(c.company))
                    f = c.lastname;
                else
                    f = (f.length > 0) ? f.concat(', ', c.lastname) : c.lastname;
            }
            else
                f = (f.length > 0) ? f.concat(' ', c.lastname) : c.lastname;
        }
        return f;
    };
    Contact.getFullnameWithTitle = function (contact) {
        var f = '';
        if (!!contact.company)
            f = contact.company;
        if (!!contact.title)
            f = (f.length > 0) ? f.concat(', ', contact.title) : contact.title;
        if (!!contact.firstname) {
            if (!!contact.title)
                f = (f.length > 0) ? f.concat(' ', contact.firstname) : contact.firstname;
            else
                f = (f.length > 0) ? f.concat(', ', contact.firstname) : contact.firstname;
        }
        if (!!contact.lastname) {
            if (!contact.firstname) {
                if (exports.OrganisationTitleValues.indexOf(contact.company))
                    f = contact.lastname;
                else
                    f = (f.length > 0) ? f.concat(', ', contact.lastname) : contact.lastname;
            }
            else
                f = (f.length > 0) ? f.concat(' ', contact.lastname) : contact.lastname;
        }
        return f;
    };
    Contact.isContactCompany = function (contact) {
        return contact.fullname !== contact.company && !!contact.company;
    };
    return Contact;
}());
exports.Contact = Contact;
var ContactEssentials = (function () {
    function ContactEssentials(firstname, lastname, title, email, telephone) {
        if (title === void 0) { title = ''; }
        if (email === void 0) { email = ''; }
        if (telephone === void 0) { telephone = ''; }
        this.firstname = firstname;
        this.lastname = lastname;
        this.title = title;
        this.email = email;
        this.telephone = telephone;
    }
    return ContactEssentials;
}());
exports.ContactEssentials = ContactEssentials;
