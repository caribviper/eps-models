"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_entity_1 = require("caribviper-entity");
var RegistryDetails = (function () {
    function RegistryDetails() {
    }
    RegistryDetails.idHelper = function (registryId, detailsType) {
        if (!registryId || !detailsType)
            return '';
        return caribviper_entity_1.Entity.generateId(registryId, detailsType, Date.now().toString());
    };
    return RegistryDetails;
}());
exports.RegistryDetails = RegistryDetails;
