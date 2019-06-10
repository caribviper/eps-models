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
var spatial_data_1 = require("./../../value-objects/spatial/spatial-data");
var registry_flat_table_1 = require("./../../value-objects/planning/registry-flat-table");
var projection_1 = require("./../../value-objects/common/projection");
var filetype_1 = require("./../../value-objects/enumerators/filetype");
var entity_model_type_1 = require("./../entity-model-type");
var contact_1 = require("./../../value-objects/common/contact");
var address_1 = require("./../../value-objects/common/address");
var caribviper_entity_1 = require("caribviper-entity");
var caribviper_common_1 = require("caribviper-common");
var numeral = require("numeral");
var stakeholder_1 = require("../../value-objects/common/stakeholder");
var Coordinate = (function () {
    function Coordinate(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        this.datePlotted = null;
        this.landTaxId = null;
        this.landUse = null;
        this.lotsCreated = null;
        this.datePlotted = new Date().getTime();
    }
    return Coordinate;
}());
exports.Coordinate = Coordinate;
var CrossReferenceItem = (function () {
    function CrossReferenceItem(registryItemId, referenceNo, systemLink) {
        if (systemLink === void 0) { systemLink = false; }
        this.registryItemId = registryItemId;
        this.referenceNo = referenceNo;
        this.systemLink = systemLink;
    }
    return CrossReferenceItem;
}());
exports.CrossReferenceItem = CrossReferenceItem;
var Milestone = (function () {
    function Milestone(date, type, comment, dateCreated) {
        this.date = date;
        this.type = type;
        this.comment = comment;
        this.dateCreated = dateCreated;
    }
    return Milestone;
}());
exports.Milestone = Milestone;
var Location = (function () {
    function Location(address, coordinate, parcel, landTaxNo, validated) {
        if (parcel === void 0) { parcel = ''; }
        if (landTaxNo === void 0) { landTaxNo = ''; }
        if (validated === void 0) { validated = false; }
        this.address = address;
        this.coordinate = coordinate;
        this.parcel = parcel;
        this.landTaxNo = landTaxNo;
        this.validated = validated;
    }
    Object.defineProperty(Location.prototype, "isEmpty", {
        get: function () {
            return !this.address || this.address.isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    Location.prototype.stringifyAddress = function () {
        return address_1.Address.stringifyAddress(this.address);
    };
    Location.convertToGeoJson = function (location) {
        if (!!location.coordinate.x && !!location.coordinate.y) {
            location.feature = new spatial_data_1.Feature(new spatial_data_1.Point(location.coordinate.x, location.coordinate.y));
            return true;
        }
        return false;
    };
    Location.appendNewGeoJson = function (location, x, y) {
        if (!!x && !!y) {
            location.feature = new spatial_data_1.Feature(new spatial_data_1.Point(x, y));
            return true;
        }
        return false;
    };
    return Location;
}());
exports.Location = Location;
var RegistryItem = (function (_super) {
    __extends(RegistryItem, _super);
    function RegistryItem(fileType, guid) {
        if (fileType === void 0) { fileType = filetype_1.RegistryFileTypes.formal; }
        if (guid === void 0) { guid = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.REGISTRY_ITEM, RegistryItem.createId(fileType || filetype_1.RegistryFileTypes.formal, guid), true) || this;
        _this.referenceNo = '';
        _this.counterValue = 0;
        _this.area = '';
        _this.location = new Location(new address_1.Address('', ''), new Coordinate());
        _this.subDivisionNumber = '';
        _this.stakeholders = [];
        _this.crossReferences = [];
        _this.milestones = [];
        _this.fees = null;
        _this.reportTags = [];
        _this.fileType = fileType || filetype_1.RegistryFileTypes.formal;
        _this.stakeholders = [];
        _this.registryId = guid;
        _this.projection = new projection_1.Projection('1', '', '', '', fileType.displayName);
        return _this;
    }
    Object.defineProperty(RegistryItem.prototype, "storageFolder", {
        get: function () {
            return this.fileType.folderPrefix + '- ' + caribviper_common_1.StringUtilities.replaceAll('/', ' ') + '\\';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "landDescription", {
        get: function () {
            var description = 'N/A';
            if (!this.details)
                return description;
            switch (this.fileType.folderPrefix) {
                case 'CH': {
                    description = this.details.proposedDevelopment;
                    break;
                }
                case 'FA': {
                    description = this.details.proposedDevelopment.description;
                    break;
                }
                case 'KT': {
                    description = "Termination of " + this.details.numberOfTrees + " trees";
                    break;
                }
                case 'PD': {
                    description = 'Development of Permitted Structure';
                    break;
                }
                case 'C':
                case 'E':
                case 'UA': {
                    description = this.details.offendingAction;
                    break;
                }
                case 'BS': {
                    description = 'BUILDING START REQUEST';
                    break;
                }
                case 'COC': {
                    description = 'CERTIFICATE OF COMPLIANCE';
                    break;
                }
                case 'CC': {
                    description = 'CONTINUING USE CERTIFICATE';
                    break;
                }
                case 'TT': {
                    description = 'USE OF BANNER/TENT/ENTERTAINMENT VENUE';
                    break;
                }
                default: {
                    description = '';
                    break;
                }
            }
            return description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "hasValidAgent", {
        get: function () {
            return (!!this.agent && !this.agent.isEmpty && !!this.agent.contact);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "agent", {
        get: function () {
            if (!!this.stakeholders && this.stakeholders.length > 1) {
                return this.stakeholders.find(function (s) { return s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.AGENT; });
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "hasValidApplicant", {
        get: function () {
            return (this.applicant && !this.applicant.isEmpty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "applicant", {
        get: function () {
            if (!!this.stakeholders && this.stakeholders.length > 0) {
                return this.stakeholders.find(function (s) { return s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.APPLICANT; });
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "mainStakeholder", {
        get: function () {
            if (!!this.stakeholders && this.stakeholders.length > 0) {
                return this.stakeholders.find(function (s) { return s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.APPLICANT || s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.OFFENDER; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "offender", {
        get: function () {
            if (this.fileType.folderPrefix === filetype_1.RegistryFileTypes.complaint.folderPrefix ||
                this.fileType.folderPrefix === filetype_1.RegistryFileTypes.enquiry.folderPrefix ||
                this.fileType.folderPrefix === filetype_1.RegistryFileTypes.unauthorised.folderPrefix)
                return this.mainStakeholder;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "complainant", {
        get: function () {
            if (this.fileType.folderPrefix === filetype_1.RegistryFileTypes.complaint.folderPrefix ||
                this.fileType.folderPrefix === filetype_1.RegistryFileTypes.enquiry.folderPrefix)
                return this.stakeholders.find(function (s) { return s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.COMPLAINANT; });
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "otherApplicants", {
        get: function () {
            var array = [];
            this.stakeholders.forEach(function (s) {
                if ((s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.APPLICANT_SECONDARY
                    || s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.COMPLAINANT
                    || s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.THIRD_PARTY) && (!!s.contact.lastname || !!s.contact.company))
                    array.push(s);
            });
            return array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "nonAgentNorComplainantStakeholders", {
        get: function () {
            var array = [];
            this.stakeholders.forEach(function (s) {
                if ((s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.APPLICANT_SECONDARY
                    || s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.OFFENDER
                    || s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.APPLICANT
                    || s.stakeholderType === stakeholder_1.STAKEHOLDER_TYPES.THIRD_PARTY) && (!!s.contact.lastname || !!s.contact.company))
                    array.push(s);
            });
            return array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "registryStatus", {
        get: function () {
            return filetype_1.FileStatusFactory.convertToStringStatus(this.status);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryItem.prototype, "hasOtherApplicants", {
        get: function () {
            return (!!this.otherApplicants && this.otherApplicants.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    RegistryItem.prototype.getStakeholderContactFullname = function (s) {
        return (!!s && !!s.contact) ? (s.contact.firstname + " " + s.contact.lastname).trim() : '';
    };
    RegistryItem.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.referenceNo, 'Must have a valid reference number');
        caribviper_common_1.Assert.isTruthy(this.projection, 'Must have a valid projection');
    };
    RegistryItem.prototype.createReferenceNumber = function (counterValue) {
        if (counterValue === void 0) { counterValue = 1; }
        caribviper_common_1.Assert.isTrue(counterValue >= 1, "Counter value cannot be less than 1");
        var referenceNo = '';
        if (this.fileType === filetype_1.RegistryFileTypes.permitted) {
            this.referenceNo = this.location.address.lot.padStart(4, '0') + "/" + this.subDivisionNumber;
            return;
        }
        if (this.fileType.isApplication) {
            referenceNo = "" + this.fileType.prefix + numeral(counterValue).format('0000')
                + ("/" + numeral(this.dateReceived.getMonth() + 1).format('00'))
                + ("/" + numeral(this.dateReceived.getFullYear()).format('00'))
                + ("" + this.area);
        }
        else {
            referenceNo = this.fileType.prefix + "/" + this.area + "/" + numeral(counterValue).format('0000')
                + ("/" + numeral(this.dateReceived.getFullYear()).format('00'));
        }
        this.referenceNo = referenceNo;
        this.counterValue = (typeof counterValue === 'number') ? counterValue : 0;
    };
    RegistryItem.createProjection = function (registry) {
        var p = new projection_1.Projection('1', registry.location.stringifyAddress(), registry.applicant.stringifyContact(), !!registry.agent ? registry.agent.stringifyContact() : '', registry.fileType.displayName);
        registry.projection = p;
        return p;
    };
    RegistryItem.createId = function (fileType, guid) {
        if (fileType === void 0) { fileType = filetype_1.RegistryFileTypes.formal; }
        if (guid === void 0) { guid = ''; }
        if (!guid)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.PLANNING.REGISTRY_ITEM, (fileType || filetype_1.RegistryFileTypes.formal).folderPrefix, guid);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.PLANNING.REGISTRY_ITEM, (fileType || filetype_1.RegistryFileTypes.formal).folderPrefix, guid);
    };
    RegistryItem.mapToEntity = function (source) {
        var r = Object.assign(new RegistryItem(), source);
        r.location.address = address_1.Address.cloneAddress(r.location.address);
        for (var i = 0; i < r.stakeholders.length; i++) {
            if (!stakeholder_1.Stakeholder.isEmpty(r.stakeholders[i])) {
                r.stakeholders[i] = new stakeholder_1.Stakeholder(contact_1.Contact.clone(r.stakeholders[i].contact), r.stakeholders[i].stakeholderType, !!r.stakeholders[i].secondaryType ? r.stakeholders[i].secondaryType : '');
            }
        }
        r.counterValue = parseInt(r.counterValue.toString());
        return r;
    };
    RegistryItem.mapToEntityArray = function (source) {
        var _this = this;
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (r) {
            array.push(_this.mapToEntity(r));
        });
        return array;
    };
    RegistryItem.convertToRegistryFlatFile = function (registry) {
        registry = this.mapToEntity(registry);
        var regFlat = new registry_flat_table_1.RegistryFlatTable();
        regFlat.registryId = registry._id;
        regFlat.referenceNo = registry.referenceNo;
        regFlat.area = registry.area;
        regFlat.dateReceived = new Date(registry.dateReceived);
        regFlat.fileType = registry.fileType.displayName;
        regFlat.status = registry.registryStatus;
        regFlat.siteAddressFull = registry.projection.location;
        regFlat.siteAddressLotNo = registry.location.address.lot;
        regFlat.siteAddressStreetOne = registry.location.address.streetOne;
        regFlat.siteAddressStreetTwo = registry.location.address.streetTwo;
        regFlat.siteAddressParish = registry.location.address.parish;
        regFlat.gisCoordinate_X = registry.location.coordinate.x;
        regFlat.gisCoordinate_Y = registry.location.coordinate.y;
        regFlat.gisDatePlotted = new Date(registry.location.coordinate.datePlotted);
        regFlat.gisLandTaxId = registry.location.coordinate.landTaxId;
        regFlat.gisLandUse = registry.location.coordinate.landUse;
        if (registry.fileType.folderPrefix === filetype_1.RegistryFileTypes.formal.prefix)
            regFlat.gisLotsCreated = registry.details.lotsToBeCreated;
        else
            regFlat.gisLotsCreated = 0;
        if (registry.fileType.isApplication) {
            regFlat.applicant = registry.applicant.contact.fullname;
            regFlat.applicantFirstname = registry.applicant.contact.firstname;
            regFlat.applicantLastname = registry.applicant.contact.lastname;
            if (registry.hasValidAgent) {
                regFlat.agent = registry.agent.contact.fullname;
                regFlat.agentFirstname = registry.agent.contact.firstname;
                regFlat.agentLastname = registry.agent.contact.lastname;
            }
            else {
                regFlat.agent = '';
                regFlat.agentFirstname = '';
                regFlat.agentLastname = '';
            }
        }
        else {
            if (!!registry.offender) {
                regFlat.applicant = registry.offender.contact.fullname;
                regFlat.applicantFirstname = registry.offender.contact.firstname;
                regFlat.applicantLastname = registry.offender.contact.lastname;
            }
            if (!!registry.complainant) {
                regFlat.agent = registry.complainant.contact.fullname;
                regFlat.agentFirstname = registry.complainant.contact.firstname;
                regFlat.agentLastname = registry.complainant.contact.lastname;
            }
            else {
                regFlat.agent = '';
                regFlat.agentFirstname = '';
                regFlat.agentLastname = '';
            }
        }
        regFlat.landDescription = registry.projection.description;
        regFlat.reportTags = registry.reportTags.join(',');
        return regFlat;
    };
    return RegistryItem;
}(caribviper_entity_1.Entity));
exports.RegistryItem = RegistryItem;
