"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var note_1 = require("./note");
var notice_1 = require("./notice");
var certificate_types_1 = require("./../../value-objects/enumerators/certificate-types");
var certificate_1 = require("./applications/certificate");
var building_start_1 = require("./../planning/building-start");
var projection_1 = require("./../../value-objects/common/projection");
var site_report_1 = require("./site-report");
var invest_1 = require("./enforcement/invest");
var temporary_1 = require("./applications/temporary");
var permitted_1 = require("./applications/permitted");
var tree_1 = require("./applications/tree");
var chattel_1 = require("./applications/chattel");
var formal_1 = require("./applications/formal");
var fee_item_1 = require("./../../value-objects/common/fee-item");
var userinfo_1 = require("./../../value-objects/common/userinfo");
var address_1 = require("./../../value-objects/common/address");
var contact_1 = require("./../../value-objects/common/contact");
var filetype_1 = require("./../../value-objects/enumerators/filetype");
var stakeholder_1 = require("./../../value-objects/common/stakeholder");
var registry_item_1 = require("./registry-item");
var report_1 = require("./report");
var __1 = require("../../..");
var projectionVersion = '1';
var PlanningFactory = (function () {
    function PlanningFactory() {
    }
    PlanningFactory.createRegistry = function (fileType) {
        var r = new registry_item_1.RegistryItem(fileType, '');
        r.acceptingUser = new userinfo_1.UserInfo('', '', '');
        r.area = '';
        r.dateLastModified = new Date();
        r.dateReceived = new Date();
        r.fees = new fee_item_1.FeeItem();
        r.status = filetype_1.FILE_STATUS.SUBMITTED;
        r.projection = new projection_1.Projection(projectionVersion, '', '', '', fileType.displayName);
        return r;
    };
    PlanningFactory.createFormal = function () {
        var r = this.createRegistry(filetype_1.RegistryFileTypes.formal);
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.AGENT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT_SECONDARY), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT_SECONDARY));
        r.details = new formal_1.FormalApplication();
        return r;
    };
    PlanningFactory.createChattel = function () {
        var r = this.createRegistry(filetype_1.RegistryFileTypes.chattel);
        r.fees.fee = 10;
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.AGENT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT_SECONDARY), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT_SECONDARY));
        r.details = new chattel_1.ChattelApplication();
        var chattel = r.details;
        chattel.proposedDevelopment = 'ERECTION OF A CHATTEL HOUSE';
        chattel.materials.wall = 'TIMBER';
        chattel.materials.roofSupportOrFloor = 'TIMBER';
        return r;
    };
    PlanningFactory.createTree = function () {
        var r = this.createRegistry(filetype_1.RegistryFileTypes.tree);
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT));
        r.details = new tree_1.KillTreeApplication();
        return r;
    };
    PlanningFactory.createPermittedDevelopment = function (registryItem, lotNo) {
        if (lotNo === void 0) { lotNo = '000'; }
        var r = this.createRegistry(filetype_1.RegistryFileTypes.permitted);
        r.location.address = !!registryItem ? registryItem.location.address : r.location.address;
        r.location.address.lot = lotNo;
        r.fees.fee = 150;
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.AGENT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT_SECONDARY), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT_SECONDARY));
        r.details = new permitted_1.PermittedApplication();
        return r;
    };
    PlanningFactory.createBuildingStart = function (registryId) {
        var b = new building_start_1.BuildingStart(registryId, '', new Date());
        b.fees = new fee_item_1.FeeItem(100, '');
        return b;
    };
    PlanningFactory.createCertificateBuildings = function (existingRegistry) {
        return this.createCertificate(existingRegistry, certificate_types_1.CERTIFICATES_COMPLIANCE_TYPES.COMPLIANCE_BUILDING);
    };
    PlanningFactory.createCertificateRoads = function (existingRegistry) {
        return this.createCertificate(existingRegistry, certificate_types_1.CERTIFICATES_COMPLIANCE_TYPES.COMPLIANCE_ROAD_WORKS);
    };
    PlanningFactory.createCertificateSubdivisions = function (existingRegistry) {
        return this.createCertificate(existingRegistry, certificate_types_1.CERTIFICATES_COMPLIANCE_TYPES.COMPLIANCE_SUBDIVISION);
    };
    PlanningFactory.createCertificateWarehouse = function (existingRegistry) {
        return this.createCertificate(existingRegistry, certificate_types_1.CERTIFICATES_COMPLIANCE_TYPES.BONDED_WAREHOUSE);
    };
    PlanningFactory.createCertificate = function (existingRegistry, certificateType) {
        var r = new registry_item_1.RegistryItem(filetype_1.RegistryFileTypes.certificate);
        r.fees = new fee_item_1.FeeItem();
        if (!!existingRegistry)
            r.referenceNo = existingRegistry.referenceNo;
        if (!!existingRegistry && !!existingRegistry.stakeholders && existingRegistry.stakeholders.length > 0) {
            r.stakeholders = existingRegistry.stakeholders;
            r.location = Object.assign(r.location, existingRegistry.location);
            r.area = existingRegistry.area;
            r.crossReferences = [];
            r.crossReferences.push(new registry_item_1.CrossReferenceItem(existingRegistry._id, existingRegistry.referenceNo, true));
            r.status = filetype_1.FILE_STATUS_VALUES.SUBMITTED;
        }
        else {
            r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.AGENT));
        }
        r.projection = new projection_1.Projection();
        r.details = new certificate_1.Certificate();
        var certificate = r.details;
        certificate.certificateType = certificateType;
        if (!!existingRegistry && certificateType !== certificate_types_1.CERTIFICATES_COMPLIANCE_TYPES.BONDED_WAREHOUSE) {
            certificate.proposedDevelopment = existingRegistry.landDescription;
        }
        else {
            certificate.proposedDevelopment = certificateType;
        }
        r.projection.description = certificate.proposedDevelopment;
        if (certificateType === certificate_types_1.CERTIFICATES_COMPLIANCE_TYPES.BONDED_WAREHOUSE)
            certificate.bondedWarehouseInformation = new certificate_1.BondedWarehouseInformation(0, '');
        certificate.applicationReferenceNo = existingRegistry.referenceNo;
        certificate.registryId = existingRegistry._id;
        r.fees = new fee_item_1.FeeItem(150, '');
        return r;
    };
    PlanningFactory.createContinuedUseCertificate = function () {
        var r = this.createRegistry(filetype_1.RegistryFileTypes.continuingUse);
        r.fees = new fee_item_1.FeeItem();
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.AGENT));
        r.details = new certificate_1.Certificate();
        r.fees = new fee_item_1.FeeItem(150, '');
        var certificate = r.details;
        certificate.certificateType = certificate_types_1.CERTIFICATES_COMPLIANCE_TYPES.CONTINUING_USE;
        return r;
    };
    PlanningFactory.createNotice = function (registryId, type, user, area) {
        var noticeType;
        noticeType = __1.NoticeType.getNoticeType(type);
        if (!noticeType)
            throw new Error('Invalid notice type');
        var n = new notice_1.Notice(registryId, '', noticeType, '', user);
        n.area = area;
        return n;
    };
    PlanningFactory.createNote = function (registryId, user) {
        return new note_1.Note('', registryId, '', user, null);
    };
    PlanningFactory.createTemporary = function () {
        var r = this.createRegistry(filetype_1.RegistryFileTypes.temporaryUse);
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.APPLICANT), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.AGENT));
        r.details = new temporary_1.TemporaryDevelopment();
        return r;
    };
    PlanningFactory.createComplaint = function () {
        var r = this.createRegistry(filetype_1.RegistryFileTypes.complaint);
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.OFFENDER), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.COMPLAINANT));
        r.details = new invest_1.Invest();
        return r;
    };
    PlanningFactory.createEnquiry = function () {
        var r = this.createRegistry(filetype_1.RegistryFileTypes.enquiry);
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.OFFENDER), new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.COMPLAINANT));
        r.details = new invest_1.Invest();
        return r;
    };
    PlanningFactory.createUnAuthorised = function () {
        var r = this.createRegistry(filetype_1.RegistryFileTypes.unauthorised);
        r.stakeholders.push(new stakeholder_1.Stakeholder(new contact_1.Contact(new address_1.Address('', '')), stakeholder_1.STAKEHOLDER_TYPES.OFFENDER));
        r.details = new invest_1.Invest();
        return r;
    };
    PlanningFactory.createReport = function (reportType, registry, currentUser) {
        var report = null;
        var description = registry.projection.description;
        if (!description) {
            if (!registry.fileType.isApplication) {
                description = registry.details.offendingAction;
            }
            else if (registry.fileType.folderPrefix === 'T')
                description = registry.details.reasonForKilling;
            else if (registry.fileType.folderPrefix === 'FA')
                description = registry.details.proposedDevelopment.description;
            else if (registry.fileType.folderPrefix === 'PD')
                description = registry.details.proposedDevelopment;
            else if (registry.fileType.folderPrefix === 'CH')
                description = registry.details.proposedDevelopment;
        }
        switch (reportType) {
            case 0: {
                report = new site_report_1.SiteReportDevelopment(registry._id, currentUser, description);
                break;
            }
            case 1: {
                report = new site_report_1.SiteReportEnforcement(registry._id, currentUser, description);
                break;
            }
            default: {
                report = new report_1.Report(registry._id, currentUser, description);
                break;
            }
        }
        return report;
    };
    PlanningFactory.createLetter = function (letterTemplate, registry, currentUser) {
        var l = new __1.Letter('', registry._id, '', currentUser);
        l.templateName = letterTemplate.name;
        l.templateId = letterTemplate._id;
        l.salutation = 'Dear Sir/Madam';
        l.valediction = 'Yours faithfully';
        l.owner = new userinfo_1.UserInfo(currentUser.username, currentUser.fullname, currentUser.domain);
        return l;
    };
    PlanningFactory.createProjection = function (registry, projectionVersion) {
        if (projectionVersion === void 0) { projectionVersion = '1'; }
        if (!registry || !projectionVersion)
            return null;
        var fullAddress = registry.location.address.lot + ' '
            + registry.location.address.streetOne + ' '
            + registry.location.address.streetTwo + ' '
            + registry.location.address.parish;
        fullAddress = fullAddress.trim();
        var fullName1 = '', fullName2 = '';
        if (!!registry.applicant) {
            fullName1 = registry.applicant.contact.title + ' ' + registry.applicant.contact.firstname + ' ' + registry.applicant.contact.lastname;
            fullName1 = fullName1.trim();
        }
        if (!!registry.agent) {
            fullName2 = registry.agent.contact.title + ' ' + registry.agent.contact.firstname + ' ' + registry.agent.contact.lastname;
            fullName2 = fullName1.trim();
        }
        return new projection_1.Projection(projectionVersion, fullAddress, fullName1, fullName2);
    };
    return PlanningFactory;
}());
exports.PlanningFactory = PlanningFactory;
