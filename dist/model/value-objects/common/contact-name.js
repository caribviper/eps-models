"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContactName = (function () {
    function ContactName() {
        this.title = '';
        this.firstname = '';
        this.lastname = '';
        this.middlename = '';
    }
    ContactName.prototype.makeCompany = function (companyName) {
        this.title = 'COMPANY';
        this.firstname = '_';
        this.lastname = companyName;
        this.middlename = '';
    };
    return ContactName;
}());
exports.ContactName = ContactName;
