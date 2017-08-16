import { Invest } from './enforcement/invest';
import { TemporaryDevelopment } from './applications/temporary';
import { Certificate } from './applications/certificate';
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
import { RegistryItem, Stakeholder, STAKEHOLDER_TYPES, Location, Coordinate } from './registry-item';

export class ModelFactory {

  private createRegistry(fileType: FileType): RegistryItem {
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
  public createFormal(): RegistryItem {
    let r: RegistryItem = this.createRegistry(RegistryFileTypes.formal);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.AGENT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT_SECONDARY),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT_SECONDARY));

    //formal
    r.details = new FormalApplication();

    return r;
  }

  //create chattel
  public createChattel(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.chattel);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.AGENT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT_SECONDARY),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT_SECONDARY));

    //details
    r.details = new ChattelApplication();
    return r;
  }

  //create tree
  public createTree(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.tree);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT));

    //details
    r.details = new KillTreeApplication();
    return r;
  }

  //create permitted development
  public createPermittedDevelopment(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.permitted);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.AGENT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT_SECONDARY),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT_SECONDARY));

    //details
    r.details = new PermittedApplication();
    return r;
  }

  //create building start
  public createBuildingStart(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.buildingStart);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT));

    //details
    r.details = new Certificate();
    return r;
  }

  //create certifcate
  public createCertificateOfCompliance(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.certificate);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.AGENT));

    //details
    r.details = new Certificate();
    return r;
  }

  //create continuing use
  public createContinuedUseCertificate(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.continuingUse);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.AGENT));

    //details
    r.details = new Certificate();
    return r;
  }

  //create temporary
  public createTemporary(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.temporaryUse);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.AGENT));

    //details
    r.details = new TemporaryDevelopment();
    return r;

  }

  //create complaint
  public createComplaint(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.complaint);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.OFFENDER),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.COMPLAINANT));

    //details
    r.details = new Invest();
    return r;
  }

  //create enquiry
  public createEnquiry(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.enquiry);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.OFFENDER),
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.COMPLAINANT));

    //details
    r.details = new Invest();
    return r;
  }

  //create unauthorised development
  public createUnAuthorised(): RegistryItem {
    let r = this.createRegistry(RegistryFileTypes.unauthorised);
    //add stakeholders
    r.stakeholders.push(
      new Stakeholder(new Contact(), STAKEHOLDER_TYPES.OFFENDER));

    //details
    r.details = new Invest();
    return r;
  }
}
