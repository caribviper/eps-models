import { Feature, Point } from './../../value-objects/spatial/geo-data';
import { RegistryFlatTable } from './../../value-objects/planning/registry-flat-table';
import { Projection } from './../../value-objects/common/projection';
import { Invest } from './enforcement/invest';
import { KillTreeApplication } from './applications/tree';
import { FormalApplication } from './applications/formal';
import { ChattelApplication } from './applications/chattel';
import { IRegistryDetails, RegistryDetails } from './iregistry-details';
import { CategoryDescription } from './../../value-objects/planning/descriptive';
import { FileType, RegistryFileTypes, FILE_TYPES, FileStatusFactory } from './../../value-objects/enumerators/filetype';
import { FeeItem } from './../../value-objects/common/fee-item';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Contact } from './../../value-objects/common/contact';
import { Address } from './../../value-objects/common/address';
import { Entity } from 'caribviper-entity';
import { Utilities, Assert, StringUtilities } from 'caribviper-common';
import * as numeral from 'numeral';
import { Stakeholder, STAKEHOLDER_TYPES } from "../../value-objects/common/stakeholder";


/**
 * Geo-spatial coordinate based on xy point data.
 */
export class Coordinate {

  public datePlotted: number = null;
  public landTaxId: string = null;
  public landUse: string = null;
  public lotsCreated: string = null;

  /**
   * Create a new coordinates
   * @param x Horizontal coordinate
   * @param y Vertical coordinate
   */
  constructor(public x: number = 0, public y: number = 0) {
    this.datePlotted = new Date().getTime();
  }
}

/**Provides cross referenceing capabilities for registry items */
export class CrossReferenceItem {

  /**
   * Creates a new cross reference
   * @param registryItemId Id of the registryItem being reference
   * @param referenceNo Reference no of the registry item
   * @param systemLink Indicates that the cross reference was made by the system and should not be removed
   */
  constructor(public registryItemId: string, public referenceNo: string, public systemLink: boolean = false) { }
}

/**Store a significant event associated with the registry item */
export class Milestone {

  /**
   * Creates a new milestone
   * @param date Date of the Milestone
   * @param type Type of milestone
   * @param comment Comments associated with event
   * @param dateCreated Date event as added
   */
  constructor(public date: Date, public type: string, public comment: string, public dateCreated: Date) { }

}

/** Details of the location data of a registry item */
export class Location {

  /**Stores geojson data for the site */
  public feature: Feature;

  /**
   * 
   * @param address Address of the registry item
   * @param coordinate Geo-spatial coordinate reference of site
   * @param parcel Parcel number 
   * @param landTaxNo Land tax number
   * @param validated Indicates whether this location has been validated
   */
  constructor(public address: Address, public coordinate: Coordinate, public parcel: string = '', public landTaxNo: string = '', public validated: boolean = false) { }

  public get isEmpty(): boolean {
    return !this.address || this.address.isEmpty;
  }

  /**
   * Converts the existing address to a stringfy
   */
  public stringifyAddress(): string {
    return Address.stringifyAddress(this.address);
  }

  public static convertToGeoJson(location: Location): boolean {
    if(!!location.coordinate.x && !!location.coordinate.y) {
      location.feature = new Feature(new Point(location.coordinate.x, location.coordinate.y));
      return true;
    }
    return false;
  }

  public static appendNewGeoJson(location: Location, x: number, y: number): boolean {
    if(!!x && !!y) {
      location.feature = new Feature(new Point(x, y));
      return true;
    }
    return false;
  }
}

/**Registry information */
export class RegistryItem extends Entity {

  /**Reference associated with the file */
  referenceNo: string = '';

  /**Item number of this type if RegistryItem. */
  counterValue: number = 0;

  /**Current area of operations */
  area: string = '';

  /**Specifies the location of the registry entry */
  location: Location = new Location(new Address('', ''), new Coordinate());

  /**Gets any valid sub-division number application is apart of. */
  subDivisionNumber: string = '';

  /**Gets the valid date the sub-division was approved */
  subDivisionNumberApprovalDate: Date;

  /**Datetime of file. */
  dateReceived: Date;

  /**Date time last modified */
  dateLastModified: Date;

  /**Specifies the type of file of the registry item. */
  fileType: FileType;

  /**Specifies the current status of the registry item. */
  status: any;

  /**Specifies the User that accepted the information. */
  acceptingUser: UserInfo;

  /**Provides information on the workflow */
  workflowInfo: any;//WorkflowActionInfo;

  /**All stakeholders */
  stakeholders: Stakeholder[] = [];

  /**Cross references this registry item is linked to */
  crossReferences: CrossReferenceItem[] = [];

  /**milestones associated with the registry item */
  milestones: Milestone[] = [];

  /**associated Fee */
  fees: FeeItem = null;

  /**Details of the registry file */
  details: RegistryDetails;

  /**Stores the guid associated with this entity */
  registryId: string;

  /**associated notices */
  //notices: Notice[] = [];

  /**This registry item has been flagged as major application */
  //majorApplication: boolean = false;

  /**Stores search related information for processing */
  projection: Projection;

  /**Indicates whether the registry item is a fast track file */
  //fastTrack: boolean = false;

  /**Stores the necessary report tags */
  reportTags: string[] = [];

  /**
   * Creates a new registry item
   * @param fileType Type of registry file to create
   * @param guid Guid to be created
   */
  constructor(fileType: FileType = RegistryFileTypes.formal, guid: string = '') {
    super(ENTITY_MODELS.PLANNING.REGISTRY_ITEM, RegistryItem.createId(fileType || RegistryFileTypes.formal, guid), true);
    this.fileType = fileType || RegistryFileTypes.formal;
    this.stakeholders = [];
    this.registryId = guid;
    this.projection = new Projection('1', '', '', '', fileType.displayName);
  }

  /**Gets the storage folder for the registry item */
  get storageFolder(): string {
    return this.fileType.folderPrefix + '- ' + StringUtilities.replaceAll('/', ' ') + '\\';
  }

  /**Gets the description about the land */
  get landDescription(): string {
    let description = 'N/A';
    if (!this.details)
      return description;
    switch (this.fileType.folderPrefix) {
      case 'CH': { description = (this.details as ChattelApplication).proposedDevelopment; break; }
      case 'FA': { description = (this.details as FormalApplication).proposedDevelopment.description; break; }
      case 'KT': { description = `Termination of ${(this.details as KillTreeApplication).numberOfTrees} trees`; break; }
      case 'PD': { description = 'Development of Permitted Structure'; break; }
      case 'C':
      case 'E':
      case 'UA': { description = (this.details as Invest).offendingAction; break; }
      case 'BS': { description = 'BUILDING START REQUEST'; break; }
      case 'COC': { description = 'CERTIFICATE OF COMPLIANCE'; break; }
      case 'CC': { description = 'CONTINUING USE CERTIFICATE'; break; }
      case 'TT': { description = 'USE OF BANNER/TENT/ENTERTAINMENT VENUE'; break; }
      default: { description = ''; break; }
    }
    return description;

  }

  //checks if the registry item has a valid agent
  get hasValidAgent(): boolean {
    return (!!this.agent && !this.agent.isEmpty && !!this.agent.contact);
  }

  //Gets the associated agent
  get agent(): Stakeholder {
    if (!!this.stakeholders && this.stakeholders.length > 1) {
      return this.stakeholders.find((s: Stakeholder) => { return s.stakeholderType === STAKEHOLDER_TYPES.AGENT });
    }
    return undefined;
  }

  //Gets whether the registry item has a valid applicant
  get hasValidApplicant(): boolean {
    return (this.applicant && !this.applicant.isEmpty);
  }

  //Get any valid applicant
  get applicant(): Stakeholder {
    if (!!this.stakeholders && this.stakeholders.length > 0) {
      return this.stakeholders.find((s: Stakeholder) => { return s.stakeholderType === STAKEHOLDER_TYPES.APPLICANT });
    }
    return undefined;
  }

  //Gets the main stakeholder. i.e. applicant/offender
  get mainStakeholder(): Stakeholder {
    if (!!this.stakeholders && this.stakeholders.length > 0) {
      return this.stakeholders.find((s: Stakeholder) => { return s.stakeholderType === STAKEHOLDER_TYPES.APPLICANT || s.stakeholderType === STAKEHOLDER_TYPES.OFFENDER });
    }
  }

  //Gets the offender if it is complaint, enquiry or unauthorised development
  get offender(): Stakeholder {
    if (this.fileType.folderPrefix === RegistryFileTypes.complaint.folderPrefix ||
      this.fileType.folderPrefix === RegistryFileTypes.enquiry.folderPrefix ||
      this.fileType.folderPrefix === RegistryFileTypes.unauthorised.folderPrefix)
      return this.mainStakeholder;
    return null;
  }

  //Gets the complainant if the registry item is an enquiry or complaint
  get complainant(): Stakeholder {
    if (this.fileType.folderPrefix === RegistryFileTypes.complaint.folderPrefix ||
      this.fileType.folderPrefix === RegistryFileTypes.enquiry.folderPrefix)
      return this.stakeholders.find((s: Stakeholder) => { return s.stakeholderType === STAKEHOLDER_TYPES.COMPLAINANT; });
    return null;
  }

  //Gets all other applicants/stakeholders
  get otherApplicants(): Stakeholder[] {
    let array: Stakeholder[] = [];
    this.stakeholders.forEach((s: Stakeholder) => {
      if ((s.stakeholderType === STAKEHOLDER_TYPES.APPLICANT_SECONDARY
        || s.stakeholderType === STAKEHOLDER_TYPES.COMPLAINANT
        || s.stakeholderType === STAKEHOLDER_TYPES.THIRD_PARTY) && (!!s.contact.lastname || !!s.contact.company))
        array.push(s);
    });
    return array;
  }

  //Gets all other applicants/stakeholders
  get nonAgentNorComplainantStakeholders(): Stakeholder[] {
    let array: Stakeholder[] = [];
    this.stakeholders.forEach((s: Stakeholder) => {
      if ((s.stakeholderType === STAKEHOLDER_TYPES.APPLICANT_SECONDARY
        || s.stakeholderType === STAKEHOLDER_TYPES.OFFENDER
        || s.stakeholderType === STAKEHOLDER_TYPES.APPLICANT
        || s.stakeholderType === STAKEHOLDER_TYPES.THIRD_PARTY) && (!!s.contact.lastname || !!s.contact.company))
        array.push(s);
    });
    return array;
  }

  //Gets the current status of the registry item
  get registryStatus(): string {
    return FileStatusFactory.convertToStringStatus(this.status);
  }

  /**
   * Gets whether the registry item has other applicants
   */
  get hasOtherApplicants(): boolean {
    return (!!this.otherApplicants && this.otherApplicants.length > 0);
  }

  /**
   * Gets the passed stakeholder full name from its contact information as one string 
   * @param s The stakeholder in question
   */
  getStakeholderContactFullname(s: Stakeholder) {
    return (!!s && !!s.contact) ? (s.contact.firstname + " " + s.contact.lastname).trim() : '';
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.referenceNo, 'Must have a valid reference number');
    Assert.isTruthy(this.projection, 'Must have a valid projection');
  }

  /**
   * Creates a reference number for the registry item.
   * @param counterValue Incremental counter value
   */
  public createReferenceNumber(counterValue: number = 1) {
    Assert.isTrue(counterValue >= 1, "Counter value cannot be less than 1");

    let referenceNo: string = '';

    //check for permitted
    if (this.fileType === RegistryFileTypes.permitted) {
      //do permitted
      this.referenceNo = this.location.address.lot.padStart(4, '0') + "/" + this.subDivisionNumber;
      return;
    }

    if (this.fileType.isApplication) {
      //applications
      referenceNo = `${this.fileType.prefix}${numeral(counterValue).format('0000')}`
        + `/${numeral(this.dateReceived.getMonth() + 1).format('00')}`
        + `/${numeral(this.dateReceived.getFullYear()).format('00')}`
        + `${this.area}`;
    }
    else {
      //enforcement matter
      referenceNo = `${this.fileType.prefix}/${this.area}/${numeral(counterValue).format('0000')}`
        + `/${numeral(this.dateReceived.getFullYear()).format('00')}`;
    }

    this.referenceNo = referenceNo;
    this.counterValue = (typeof counterValue === 'number') ? counterValue : 0;
  }

  /**
   * Creates a projection from an existing registry item;
   * @param registry Regsitry item to have projection created from
   */
  public static createProjection(registry: RegistryItem): Projection {
    let p: Projection = new Projection('1', registry.location.stringifyAddress(), registry.applicant.stringifyContact(), !!registry.agent ? registry.agent.stringifyContact() : '', registry.fileType.displayName);
    registry.projection = p;
    return p;
  }

  public static createId(fileType: FileType = RegistryFileTypes.formal, guid: string = ''): string {
    if (!guid)
      return Entity.generateId(ENTITY_MODELS.PLANNING.REGISTRY_ITEM, (fileType || RegistryFileTypes.formal).folderPrefix, guid);
    return Entity.generateId(ENTITY_MODELS.PLANNING.REGISTRY_ITEM, (fileType || RegistryFileTypes.formal).folderPrefix, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: RegistryItem | Entity): RegistryItem {
    let r: RegistryItem = Object.assign(new RegistryItem(), source);
    r.location.address = Address.cloneAddress(r.location.address);
    for (let i = 0; i < r.stakeholders.length; i++) {
      if (!Stakeholder.isEmpty(r.stakeholders[i]))
        r.stakeholders[i] = new Stakeholder(Contact.clone(r.stakeholders[i].contact), r.stakeholders[i].stakeholderType);
    }
    r.counterValue = parseInt(r.counterValue.toString());
    return r;
  }

  public static mapToEntityArray(source: RegistryItem[]): RegistryItem[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(r => {
      array.push(this.mapToEntity(r));
    });
    return array;
  }

  public static convertToRegistryFlatFile(registry: RegistryItem): RegistryFlatTable {
    registry = this.mapToEntity(registry);
    let regFlat = new RegistryFlatTable();
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
    if (registry.fileType.folderPrefix === RegistryFileTypes.formal.prefix)
      regFlat.gisLotsCreated = (registry.details as FormalApplication).lotsToBeCreated;
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
        //make complainant agent     
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
  }
}
