import { Certificate, BuildingStart } from './certificate';
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
import { FileType, RegistryFileTypes } from './../../value-objects/enumerators/filetype';
import { STAKEHOLDER_TYPES, Stakeholder } from './../../value-objects/common/stakeholder';
import { RegistryItem, Location, Coordinate} from './registry-item';
import { Report } from "./report";

export class PlanningFactory {

  public static createRegistry(fileType: FileType): RegistryItem {
    let r = new RegistryItem(fileType, '');
    r.acceptingUser = new UserInfo('', '');
    r.area = '';
    r.dateLastModified = new Date();
    r.dateReceived = new Date();
    r.fees = new FeeItem();
    r.majorApplication = false;
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
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT_SECONDARY),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT_SECONDARY));

    //details
    r.details = new ChattelApplication();
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
  public static createPermittedDevelopment(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.permitted);
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
    let c = new BuildingStart(registryId, '');
    c.applicant = new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT);
    c.agent = new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT);
    return c;
  }

  //create certifcate
  public static createCertificateOfCompliance(registryId: string): Certificate {
    let c = new Certificate(registryId);
    c.applicant = new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT);
    c.agent = new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT);
    return c;
  }

  //create continuing use
  public static createContinuedUseCertificate(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.continuingUse);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(new Address('', '')), STAKEHOLDER_TYPES.AGENT));

    //details
    r.details = new Certificate();
    return r;
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
    let description = (registry.details as any).proposedDevelopment.description
      || (registry.details as any).proposedDevelopment
      || (registry.details as any).offendingAction;
    switch (reportType) {
      case 0: {//site
        report = new SiteReportDevelopment(registry.registryId, currentUser, description);
        report.content = '<p><br/></p>';
        break;
      }
      case 1: {//enf
        report = new SiteReportEnforcement(registry.registryId, currentUser, description);
        report.content = '<p><br/></p>';
        break;
      }
      default: {//general
        report = new Report(registry.registryId, currentUser, description);
        report.content = '<p><br/></p>';
        break;
      }
    }
    return report;
  }

  //Create projection
  public static createProjection(registry: RegistryItem, projectionVersion: string): Projection {
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
