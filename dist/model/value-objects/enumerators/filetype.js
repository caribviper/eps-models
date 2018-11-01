"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_common_1 = require("caribviper-common");
exports.FILE_STATUS = {
    APPROVED: 'Approved',
    DENIED: 'Denied',
    DISMISSED: 'Dismissed',
    DRAFT: 'Draft',
    ENFORCEMENT: 'Enforcement Notice Served',
    EXECUTUION: 'Execution',
    FINAL: 'Final Notice Served',
    INDEFINTE_DEFERAL: 'Indefinte Deferral',
    INVESTIGATING: 'Investigating',
    ISSUED: 'Issued',
    LAPSED: 'Lapsed',
    PERMITTED: 'Permitted',
    REFUSED: 'Refused',
    REVOCATED: 'Revocated',
    SECTION37: 'Section37 Letter',
    STOPPED: 'Stop Notice Served',
    SUBMITTED: 'Submitted',
    WARNING: 'Warning Notice Served',
    WITHDRAWN: 'Withdrawn',
    ENFORCEMENT_EXECUTED: 'Enforcement Executed',
    INDEFINTE_DEFFERAL: 'Indefinite Defferal'
};
exports.FILE_STATUS_VALUES = {
    SUBMITTED: 0,
    PERMITTED: 1,
    REFUSED: 2,
    WITHDRAWN: 3,
    DRAFT: 4,
    PERMISSION_LAPSED: 5,
    ISSUED: 101,
    DENIED: 102,
    REVOCATED: 103,
    INVESTIGATING: 200,
    WARNING_NOTICE_SERVED: 201,
    ENFORCEMENT_NOTICE_SERVED: 202,
    STOP_NOTICE_SERVED: 203,
    FINAL_NOTICE_SERVED: 204,
    SECTION37_NOTICE_SERVED: 205,
    ENFORCEMENT_EXECUTED: 206,
    INDEFINTE_DEFFERAL: 207,
    DISMISSED: 208
};
var FileStatusFactory = (function () {
    function FileStatusFactory() {
    }
    FileStatusFactory.convertToStringStatus = function (status) {
        var convertedStatus;
        try {
            convertedStatus = this.dictionary[status.toString()];
            if (convertedStatus === undefined || !convertedStatus)
                convertedStatus = status;
        }
        catch (error) {
            convertedStatus = 'N/A';
        }
        return convertedStatus;
    };
    FileStatusFactory.dictionary = {
        '0': 'SUBMITTED',
        '1': 'PERMITTED',
        '2': 'REFUSED',
        '3': 'WITHDRAWN',
        '4': 'DRAFT',
        '5': 'PERMISSION LAPSED',
        '101': 'ISSUED',
        '102': 'DENIED',
        '103': 'REVOCATED',
        '200': 'INVESTIGATING',
        '201': 'WARNING NOTICE SERVED',
        '202': 'ENFORCEMENT NOTICE SERVED',
        '203': 'STOP NOTICE SERVED',
        '204': 'FINAL NOTICE SERVED',
        '205': 'SECTION37 NOTICE SERVED',
        '206': 'ENFORCEMENT EXECUTED',
        '207': 'INDEFINTE DEFFERAL',
        '208': 'DISMISSED'
    };
    return FileStatusFactory;
}());
exports.FileStatusFactory = FileStatusFactory;
var FileType = (function () {
    function FileType(displayName, folderPrefix, prefix, isApplication) {
        if (isApplication === void 0) { isApplication = false; }
        this.displayName = displayName;
        this.folderPrefix = folderPrefix;
        this.prefix = prefix;
        this.isApplication = isApplication;
        caribviper_common_1.Assert.isTruthy(displayName, 'Display name cannot be undefined or empty');
    }
    return FileType;
}());
exports.FileType = FileType;
exports.COUNTER_PREFIXES = [
    { prefix: 'A', description: 'Applications', type: 'application' },
    { prefix: 'COC', description: 'Certificate of Compliance', type: 'application' },
    { prefix: 'LB', description: 'Listed Buildings', type: 'application' },
    { prefix: 'KT', description: 'Trees', type: 'application' },
    { prefix: 'C', description: 'Complaint', type: 'enforcement' },
    { prefix: 'E', description: 'Enquiry', type: 'enforcement' },
    { prefix: 'UA', description: 'Unauthorised Development', type: 'enforcement' },
    { prefix: 'EN', description: 'Enforcement Notice', type: 'notice' },
    { prefix: 'S37', description: 'Section 37 Letter', type: 'notice' },
    { prefix: 'SN', description: 'Stop Notice', type: 'notice' },
    { prefix: 'FN', description: 'Final Notice', type: 'notice' },
    { prefix: 'WN', description: 'Warning Notice', type: 'notice' }
];
exports.FILE_TYPES = {
    FORMAL: 'Formal Application',
    CHATTEL: 'Chattel Application',
    PERMITTED: 'Permitted Development Application',
    LISTED: 'Listed Building Application',
    TREE: 'Permission to Kill Tree',
    UNAUTHORISED: 'Unauthorised Development',
    COMPLAINT: 'Complaint',
    ENQUIRY: 'Enquiry',
    ENFORCEMENT: 'Enforcement',
    CERTIFICATE: 'Certificate of Compliance',
    BUILDING_START: 'Building Start',
    CONTINUING_USE: 'Continuing Use Application',
    TEMPORARY_DEVELOPMENT: 'Temporary Development of Land'
};
var RegistryFileTypes = (function () {
    function RegistryFileTypes() {
    }
    Object.defineProperty(RegistryFileTypes, "formal", {
        get: function () { return this._formal; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "chattel", {
        get: function () { return this._chattel; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "permitted", {
        get: function () { return this._permitted; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "listed", {
        get: function () { return this._listed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "tree", {
        get: function () { return this._tree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "unauthorised", {
        get: function () { return this._unauthorised; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "complaint", {
        get: function () { return this._complaint; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "enquiry", {
        get: function () { return this._enquiry; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "enforcement", {
        get: function () { return this._enforcement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "certificate", {
        get: function () { return this._certificate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "continuingUse", {
        get: function () { return this._continuingUse; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistryFileTypes, "temporaryUse", {
        get: function () { return this._temporaryUse; },
        enumerable: true,
        configurable: true
    });
    RegistryFileTypes._formal = new FileType(exports.FILE_TYPES.FORMAL, 'FA', '', true);
    RegistryFileTypes._chattel = new FileType(exports.FILE_TYPES.CHATTEL, 'CH', '', true);
    RegistryFileTypes._permitted = new FileType(exports.FILE_TYPES.PERMITTED, 'PD', '', true);
    RegistryFileTypes._listed = new FileType(exports.FILE_TYPES.LISTED, 'LB', '', true);
    RegistryFileTypes._tree = new FileType(exports.FILE_TYPES.TREE, 'KT', 'T', true);
    RegistryFileTypes._unauthorised = new FileType(exports.FILE_TYPES.UNAUTHORISED, 'UA', '522', false);
    RegistryFileTypes._complaint = new FileType(exports.FILE_TYPES.COMPLAINT, 'C', '404', false);
    RegistryFileTypes._enquiry = new FileType(exports.FILE_TYPES.ENQUIRY, 'E', '288', false);
    RegistryFileTypes._enforcement = new FileType(exports.FILE_TYPES.ENFORCEMENT, 'EN', '', false);
    RegistryFileTypes._certificate = new FileType(exports.FILE_TYPES.CERTIFICATE, 'COC', 'COC', true);
    RegistryFileTypes._continuingUse = new FileType(exports.FILE_TYPES.CONTINUING_USE, 'CC', 'CC', true);
    RegistryFileTypes._temporaryUse = new FileType(exports.FILE_TYPES.TEMPORARY_DEVELOPMENT, 'TT', 'TT', true);
    return RegistryFileTypes;
}());
exports.RegistryFileTypes = RegistryFileTypes;
exports.NOTICE_TYPE_PREFIXES = {
    WARNING: 'WN',
    ENFORCEMENT: 'EN',
    FINAL: 'FN',
    STOP: 'SN',
    SECTION37: 'S37'
};
var NoticeType = (function () {
    function NoticeType(name, prefix) {
        this.name = name;
        this.prefix = prefix;
    }
    NoticeType.getNoticeType = function (prefix) {
        var type = null;
        switch (prefix) {
            case exports.NOTICE_TYPE_PREFIXES.WARNING: {
                type = RegistryNoticeTypes.warning();
                break;
            }
            case exports.NOTICE_TYPE_PREFIXES.STOP: {
                type = RegistryNoticeTypes.stop();
                break;
            }
            case exports.NOTICE_TYPE_PREFIXES.ENFORCEMENT: {
                type = RegistryNoticeTypes.enforcement();
                break;
            }
            case exports.NOTICE_TYPE_PREFIXES.FINAL: {
                type = RegistryNoticeTypes.final();
                break;
            }
            case exports.NOTICE_TYPE_PREFIXES.SECTION37: {
                type = RegistryNoticeTypes.section37();
                break;
            }
        }
        return type;
    };
    return NoticeType;
}());
exports.NoticeType = NoticeType;
var RegistryNoticeTypes = (function () {
    function RegistryNoticeTypes() {
    }
    RegistryNoticeTypes.warning = function () { return new NoticeType('warning notice', exports.NOTICE_TYPE_PREFIXES.WARNING); };
    RegistryNoticeTypes.enforcement = function () { return new NoticeType('enforcement notice', exports.NOTICE_TYPE_PREFIXES.ENFORCEMENT); };
    RegistryNoticeTypes.final = function () { return new NoticeType('final notice', exports.NOTICE_TYPE_PREFIXES.FINAL); };
    RegistryNoticeTypes.stop = function () { return new NoticeType('stop notice', exports.NOTICE_TYPE_PREFIXES.STOP); };
    RegistryNoticeTypes.section37 = function () { return new NoticeType('section 37 notice', exports.NOTICE_TYPE_PREFIXES.SECTION37); };
    return RegistryNoticeTypes;
}());
exports.RegistryNoticeTypes = RegistryNoticeTypes;
