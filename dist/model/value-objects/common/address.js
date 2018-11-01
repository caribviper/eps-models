"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_common_1 = require("caribviper-common");
var Address = (function () {
    function Address(parish, streetOne, streetTwo, lot, country, postalCode, inCareOf) {
        if (streetTwo === void 0) { streetTwo = ''; }
        if (lot === void 0) { lot = ''; }
        if (country === void 0) { country = 'BARBADOS'; }
        if (postalCode === void 0) { postalCode = ''; }
        if (inCareOf === void 0) { inCareOf = ''; }
        this.parish = parish;
        this.streetOne = streetOne;
        this.streetTwo = streetTwo;
        this.lot = lot;
        this.country = country;
        this.postalCode = postalCode;
        this.inCareOf = inCareOf;
    }
    Object.defineProperty(Address.prototype, "isEmpty", {
        get: function () {
            return !this.parish && !this.streetOne && !this.streetTwo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "addressLine", {
        get: function () {
            return Address.stringifyAddress(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "addressLineNoParish", {
        get: function () {
            return Address.stringifyAddress(this, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "addressLineCapitalise", {
        get: function () {
            return Address.stringifyAddress(this, true, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Address.cloneAddress = function (a) {
        return new Address(a.parish, a.streetOne, a.streetTwo, a.lot, a.country, a.postalCode, a.inCareOf);
    };
    Address.stringifyAddress = function (address, useParish, useCountry, titleCase) {
        if (useParish === void 0) { useParish = true; }
        if (useCountry === void 0) { useCountry = false; }
        if (titleCase === void 0) { titleCase = false; }
        var result = '';
        if (!address)
            return '';
        if (!!address.inCareOf)
            result = result + ("C/O " + address.inCareOf + ", ");
        if (!!address.lot && address.lot.trim() != '.')
            result = result + ("Lot " + address.lot + ", ");
        result = result + ("" + address.streetOne);
        if (!!address.streetTwo)
            result = result + (", " + address.streetTwo + " ");
        if (!!address.parish && useParish)
            result = result + (", " + address.parish + " ");
        if (!!address.postalCode)
            result = result + (", " + address.postalCode + " ");
        if (!!address.country && useCountry)
            result = result + (", " + address.country + " ");
        result = !!result ? result.trim() : result;
        if (titleCase)
            result = caribviper_common_1.StringUtilities.capitalize(result);
        return result;
    };
    return Address;
}());
exports.Address = Address;
