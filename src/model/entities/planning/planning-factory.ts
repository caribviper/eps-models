import { Notice } from './notice';
import { CERTIFICATES_COMPLIANCE_TYPES } from './../../value-objects/enumerators/certificate-types';
import { Certificate, BondedWarehouseInformation } from './applications/certificate';
import { BuildingStart } from './../planning/building-start';
import { Projection } from './../../value-objects/common/projection';
import { SiteReportDevelopment, SiteReportEnforcement } from './site-report';
import { Invest } from './enforcement/invest';
import { TemporaryDevelopment } from './applications/temporary';
import { PermittedApplication } from './applications/permitted';
import { KillTreeApplication } from './applications/tree';
import { ChattelApplication } from './applications/chattel';
import { FloorSpaceMeasurement, Measurements } from './../../value-objects/planning/measurement';
import { CommercialDescription, CategoryDescription, InterestInLand, Materials } from './../../value-objects/planning/descriptive';
import { FormalApplication } from './applications/formal';
import { FeeItem } from './../../value-objects/common/fee-item';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Address } from './../../value-objects/common/address';
import { Contact } from './../../value-objects/common/contact';
import { FileType, RegistryFileTypes, FILE_TYPES, FILE_STATUS_VALUES, FILE_STATUS } from './../../value-objects/enumerators/filetype';
import { STAKEHOLDER_TYPES, Stakeholder } from './../../value-objects/common/stakeholder';
import { RegistryItem, Location, Coordinate, CrossReferenceItem } from './registry-item';
import { Report } from "./report";
import { RegistryNoticeTypes, NoticeType } from '../../..';

const projectionVersion: string = '1';

export class PlanningFactory {

  public static createRegistry(fileType: FileType): RegistryItem {
    let r = new RegistryItem(fileType, '');
    r.acceptingUser = new UserInfo('', '');
    r.area = '';
    r.dateLastModified = new Date();
    r.dateReceived = new Date();
    r.fees = new FeeItem();
    r.majorApplication = false;
    r.status = FILE_STATUS.SUBMITTED;
    r.projection = new Projection(projectionVersion, '', '', '', fileType.displayName);
    return r;
  }

  //create applications
  public static createFormal(): RegistryItem {
    let r: RegistryItem = this.createRegistry(RegistryFileTypes.formal);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT_SECONDARY),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT_SECONDARY));

    //formal
    r.details = new FormalApplication();

    return r;
  }

  //create chattel
  public static createChattel(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.chattel);
    r.fees.fee = 100;
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT_SECONDARY),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT_SECONDARY));

    //details
    r.details = new ChattelApplication();
    let chattel = r.details as ChattelApplication;
    chattel.proposedDevelopment = 'ERECTION OF A CHATTEL HOUSE';
    chattel.materials.wall = 'TIMBER';
    chattel.materials.roofSupportOrFloor = 'TIMBER';
    return r;
  }

  //create tree
  public static createTree(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.tree);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT));

    //details
    r.details = new KillTreeApplication();
    return r;
  }

  //create permitted development
  public static createPermittedDevelopment(registryItem: RegistryItem, lotNo: string = '000'): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.permitted);
    r.location.address = !!registryItem ? registryItem.location.address : r.location.address;
    r.location.address.lot = lotNo;
    r.fees.fee = 150;
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT_SECONDARY),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT_SECONDARY));

    //details
    r.details = new PermittedApplication();
    return r;
  }

  //create building start
  public static createBuildingStart(registryId: string): BuildingStart {
    let b = new BuildingStart(registryId, '', new Date());
    b.fees = new FeeItem(100, '');
    return b;
  }

  public static createCertificateBuildings(existingRegistry: RegistryItem): RegistryItem {
    return this.createCertificate(existingRegistry, CERTIFICATES_COMPLIANCE_TYPES.COMPLIANCE_BUILDING);
  }

  public static createCertificateRoads(existingRegistry: RegistryItem): RegistryItem {
    return this.createCertificate(existingRegistry, CERTIFICATES_COMPLIANCE_TYPES.COMPLIANCE_ROAD_WORKS);
  }

  public static createCertificateSubdivisions(existingRegistry: RegistryItem): RegistryItem {
    return this.createCertificate(existingRegistry, CERTIFICATES_COMPLIANCE_TYPES.COMPLIANCE_SUBDIVISION);
  }

  public static createCertificateWarehouse(existingRegistry: RegistryItem): RegistryItem {
    return this.createCertificate(existingRegistry, CERTIFICATES_COMPLIANCE_TYPES.BONDED_WAREHOUSE);
  }

  private static createCertificate(existingRegistry: RegistryItem, certificateType: string): RegistryItem {
    let r = new RegistryItem(RegistryFileTypes.certificate);
    r.fees = new FeeItem();
    if (!!existingRegistry)
      r.referenceNo = existingRegistry.referenceNo;
    if (!!existingRegistry && !!existingRegistry.stakeholders && existingRegistry.stakeholders.length > 0) {
      r.stakeholders = existingRegistry.stakeholders;
      r.location = Object.assign(r.location, existingRegistry.location);
      r.area = existingRegistry.area;
      r.crossReferences = [];
      r.crossReferences.push(new CrossReferenceItem(existingRegistry._id, existingRegistry.referenceNo, true));
      r.status = FILE_STATUS_VALUES.SUBMITTED;
    }
    else {
      r.stakeholders.push(
        new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT),
        new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT));
    }
    //do projection
    r.projection = new Projection();
    r.details = new Certificate();
    let certificate = (r.details as Certificate);
    certificate.certificateType = certificateType;
    if (!!existingRegistry && certificateType !== CERTIFICATES_COMPLIANCE_TYPES.BONDED_WAREHOUSE) {
      certificate.proposedDevelopment = existingRegistry.landDescription;
    }
    else {
      certificate.proposedDevelopment = certificateType;
    }
    r.projection.description = certificate.proposedDevelopment;
    if (certificateType === CERTIFICATES_COMPLIANCE_TYPES.BONDED_WAREHOUSE)
      certificate.bondedWarehouseInformation = new BondedWarehouseInformation(0, '');
    certificate.applicationReferenceNo = existingRegistry.referenceNo;
    certificate.registryId = existingRegistry._id;
    r.fees = new FeeItem(150, '');
    return r;
  }

  //create continuing use
  public static createContinuedUseCertificate(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.continuingUse);
    r.fees = new FeeItem();
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT));

    //details
    r.details = new Certificate();
    r.fees = new FeeItem(150, '');
    let certificate = (r.details as Certificate);
    certificate.certificateType = CERTIFICATES_COMPLIANCE_TYPES.CONTINUING_USE;
    return r;
  }

  /**
   * Creates a new notice
   * @param registryId Id of the registry item notice is bound to
   * @param type Prefix type of the notice
   * @param user User that created notice
   */
  public static createNotice(registryId: string, type: string, user): Notice {
    let noticeType: NoticeType;
    if (!!type || RegistryNoticeTypes.enforcement().prefix == type.toUpperCase())
      noticeType = RegistryNoticeTypes.enforcement();
    if (RegistryNoticeTypes.stop().prefix == type.toUpperCase())
      noticeType = RegistryNoticeTypes.stop();
    if (RegistryNoticeTypes.warning().prefix == type.toUpperCase())
      noticeType = RegistryNoticeTypes.warning();
    if (RegistryNoticeTypes.section37().prefix == type.toUpperCase())
      noticeType = RegistryNoticeTypes.section37();
    if (RegistryNoticeTypes.final().prefix == type.toUpperCase())
      noticeType = RegistryNoticeTypes.final();
    let n = new Notice(registryId, '', noticeType, '', user);
    return n;
  }

  //create temporary
  public static createTemporary(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.temporaryUse);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT));

    //details
    r.details = new TemporaryDevelopment();
    return r;

  }

  //create complaint
  public static createComplaint(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.complaint);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.OFFENDER),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.COMPLAINANT));

    //details
    r.details = new Invest();
    return r;
  }

  //create enquiry
  public static createEnquiry(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.enquiry);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.OFFENDER),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.COMPLAINANT));

    //details
    r.details = new Invest();
    return r;
  }

  //create unauthorised development
  public static createUnAuthorised(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.unauthorised);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.OFFENDER));

    //details
    r.details = new Invest();
    return r;
  }

  //Create new report
  public static createReport(reportType: number, registry: RegistryItem, currentUser: UserInfo): Report | SiteReportDevelopment | SiteReportEnforcement {
    let report = null;
    //get description
    // let description = (registry.details as any).proposedDevelopment.description
    //   || (registry.details as any).proposedDevelopment
    //   || (registry.details as any).offendingAction;
    let description = registry.projection.description;
    switch (reportType) {
      case 0: {//site
        report = new SiteReportDevelopment(registry._id, currentUser, description);
        //report.content = '<p><br/></p>';
        break;
      }
      case 1: {//enf
        report = new SiteReportEnforcement(registry._id, currentUser, description);
        //report.content = '<p><br/></p>';
        break;
      }
      default: {//general
        report = new Report(registry._id, currentUser, description);
        //report.content = '<p><br/></p>';
        break;
      }
    }
    return report;
  }

  //Create projection
  public static createProjection(registry: RegistryItem, projectionVersion: string = '1'): Projection {
    if (!registry || !projectionVersion)
      return null;
    let fullAddress = registry.location.address.lot + ' '
      + registry.location.address.streetOne + ' '
      + registry.location.address.streetTwo + ' '
      + registry.location.address.parish;
    fullAddress = fullAddress.trim();

    let fullName1 = '', fullName2 = '';
    if (!!registry.applicant) {
      fullName1 = registry.applicant.contact.title + ' ' + registry.applicant.contact.firstname + ' ' + registry.applicant.contact.lastname
      fullName1 = fullName1.trim();
    }
    if (!!registry.agent) {
      fullName2 = registry.agent.contact.title + ' ' + registry.agent.contact.firstname + ' ' + registry.agent.contact.lastname
      fullName2 = fullName1.trim();
    }
    return new Projection(projectionVersion, fullAddress, fullName1, fullName2);
  }


}
