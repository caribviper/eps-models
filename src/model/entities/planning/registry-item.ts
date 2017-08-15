import { Notice } from './enforcement/notice';
import { IRegistryDetails, RegistryDetails } from './iregistry-details';
import { CategoryDescription } from './../../value-objects/planning/descriptive';
import { FileType, RegistryFileTypes, FILE_TYPES } from './../../value-objects/enumerators/filetype';
import { FeeItem } from './../../value-objects/common/fee-item';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Contact } from './../../value-objects/common/contact';
import { Address } from './../../value-objects/common/address';
import { Entity } from 'caribviper-entities';
import { Utilities, Assert } from 'caribviper-common';
import * as numeral from 'numeral';


/**
 * Geo-spatial coordinate based on xy point data.
 */
export class Coordinate {
  /**
   * Create a new coordinates
   * @param x Horizontal coordinate
   * @param y Vertical coordinate
   */
  constructor(public x: number = 0, public y: number = 0) { }
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

  /**
   * 
   * @param address Address of the registry item
   * @param coordinate Geo-spatial coordinate reference of site
   * @param parcel Parcel number 
   * @param landTaxNo Land tax number
   * @param validated Indicates whether this location has been validated
   */
  constructor(public address: Address, public coordinate: Coordinate, public parcel: string = '', public landTaxNo: string = '', public validated: boolean = false) { }
}

/**Types of stakeholders */
export const STAKEHOLDER_TYPES = {
  APPLICANT: 'applicant',
  APPLICANT_SECONDARY: 'applicant secondary',
  AGENT: 'agent',
  COMPLAINANT: 'complainant',
  OFFENDER: 'offender',
  THIRD_PARTY: 'third party',
  ASSOCIATED_ORGANISATION: 'associated organisation'
};

/** Details of the a stakeholder */
export class Stakeholder {
  /**Indicates if the stakeholder is active. A false indicates that the stakeholder was present but is no longer active */
  active: boolean;

  /**
   * Creates a new stakeholder
   * @param contact Contact information of the stakeholder
   * @param stakeholderType Type of stakeholder
   */
  constructor(public contact: Contact, public stakeholderType: string) { }
}

/**Registry information */
export class RegistryItem extends Entity {

  /**Reference associated with the file */
  referenceNo: string;

  /**Item number of this type if RegistryItem. */
  counterValue: number;

  /**Current area of operations */
  area: string;

  /**Specifies the location of the registry entry */
  location: Location;

  /**Gets any valid sub-division number application is apart of. */
  subDivisionNumber: string;

  /**Gets the valid date the sub-division was approved */
  subDivisionNumberApprovalDate: Date;

  /**Datetime of file. */
  dateReceived: Date;

  /**Date time last modified */
  dateLastModified: Date;

  /**Specifies the type of file of the registry item. */
  fileType: FileType;

  /**Specifies the current status of the registry item. */
  status: string;

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

  /**
   * Get the proposed development description. 
   * Should allow automatic generation of proposed development from dblist.
   */
  proposedDevelopment: CategoryDescription = new CategoryDescription();

  /**Mail address */
  mailingAddress: Address;

  /**Details of the registry file */
  details: RegistryDetails;

  /**Stores the guid associated with this entity */
  registryId: string;

  /**associated notices */
  notices: Notice[] = [];

  /**
   * 
   * @param fileType Type of registry file to create
   * @param guid Guid to be created
   */
  constructor(fileType: FileType = RegistryFileTypes.formal, guid: string = '') {
    super(ENTITY_MODELS.PLANNING.REGISTRY_ITEM, RegistryItem.createId(fileType || RegistryFileTypes.formal, guid));
    this.fileType = fileType || RegistryFileTypes.formal;
    this.stakeholders = [];
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry item cannot be transient');
    Assert.isTruthy(this.referenceNo, 'Must have a valida reference number');
  }

  public createReferenceNumber(counterValue: number) {
    Assert.isTrue(counterValue >= 1, "Counter value cannot be less than 1");

    let referenceNo: string = '';

    //check for permitted
    if (this.fileType === RegistryFileTypes.permitted) {
      //do permitted
      this.referenceNo = numeral(counterValue).format('0000') + "/" + this.location.address.lot + "/" + this.subDivisionNumber;
      return;
    }

    if (this.fileType.isApplication) {
      //applications
      referenceNo = `${this.fileType.prefix}${numeral(counterValue).format('0000')}`
        + `/${numeral(this.dateReceived.getMonth()).format('00')}`
        + `/${numeral(this.dateReceived.getFullYear()).format('00')}`
        + `${this.area}`;
    }
    else {
      //enforcement matter
      referenceNo = `${this.fileType.prefix}/${this.area}/${numeral(counterValue).format('0000')}`
        + `/${numeral(this.dateReceived.getFullYear()).format('00')}`;
    }

    this.referenceNo = referenceNo;
    this.counterValue = counterValue;
  }


  public static createId(fileType: FileType = RegistryFileTypes.formal, guid: string = ''): string {
    return Entity.generateId(ENTITY_MODELS.PLANNING.REGISTRY_ITEM, (fileType || RegistryFileTypes.formal).folderPrefix, guid || Utilities.guid());
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: RegistryItem | RegistryItem[]): RegistryItem | RegistryItem[] {
    if (source instanceof Array) {
      if (source.length < 1)
        return [];
      let array = [];
      source.forEach(element => {
        array.push(Object.assign(new RegistryItem(), source));
      });
      return array;
    }
    else
      return Object.assign(new RegistryItem(), source);
  }
}
