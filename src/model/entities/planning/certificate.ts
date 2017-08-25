import { Stakeholder, STAKEHOLDER_TYPES } from './../../value-objects/common/stakeholder';
import { UserInfo } from './../../value-objects/common/userinfo';
import { ENTITY_MODELS } from './../entity-model-type';
import { Contact } from './../../value-objects/common/contact';
import { Assert } from 'caribviper-common';
import { Entity } from 'caribviper-entities';

/** Provide information required for a Certificate Application without an original application */
export class CertificateBusinessInformation {
  /**Required floor space in metric. */
  floorSpace: number;

  /**Description of the materials to be stored if any. */
  materialsStored: string;

  constructor(floorSpace: number = 0, materialsStored: string = '') {
    this.floorSpace = floorSpace;
    this.materialsStored = materialsStored;
  }
}

export abstract class CertificateBase extends Entity {

  //date received
  dateReceived: Date;

  //Applicant of the certificate
  applicant: Stakeholder = new Stakeholder(new Contact(), STAKEHOLDER_TYPES.APPLICANT);

  //Agent for the applicant
  agent: Stakeholder = new Stakeholder(new Contact(), STAKEHOLDER_TYPES.AGENT);

  /**Gets or sets the reference type, with respect to the reference Secondary file number. */
  subdivisionRegistryId: string = '';

  /**Date building start was certified. */
  certificationDate: Date;

  /**Get the user who certified the building start */
  certifiedBy: UserInfo;

  /**Gets the associated lotnumber */
  lotNumber: string = '';

  /**Specifies the comments assocaited with the certification of the document. */
  comments: string = '';

  /**Get document id */
  documentId: string = '';

  registryId: string = '';



  /**Gets whether building start/certificate was certified */
  get certified(): boolean {
    return !this.certificationDate;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Certificate cannot be transient');
    Assert.isTruthy(this.registryId, 'Certificate requires a valid registry item id');
  }

  /**
   * Certifies a certificate
   * @param certifiedDate Date of certification
   * @param certifiedBy User that certified the certificate
   */
  public certify(certifiedDate: Date, certifiedBy: UserInfo) {
    this.certificationDate = certifiedDate;
    this.certifiedBy = certifiedBy;
  }
}


export class BuildingStart extends CertificateBase {

  /**Date construction began. */
  public commencementDate: Date;

  constructor(registryId: string = '', guid: string ='', commencementDate: Date = null ) {
    super(ENTITY_MODELS.PLANNING.BUILDING_START, BuildingStart.createId(registryId, guid));
    this.registryId = registryId;
    this.commencementDate = commencementDate;
  }

  public static createId(registryId: string = '', guid: string = ''): string {
    if (!registryId || !guid)
      return '';
    return Entity.generateId(ENTITY_MODELS.PLANNING.REGISTRY_ITEM, registryId, ENTITY_MODELS.PLANNING.BUILDING_START, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): BuildingStart {
    return Object.assign(new BuildingStart(), source);
  }

  public static mapToEntityArray(source: BuildingStart[]): BuildingStart[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new BuildingStart(), element));
    });
    return array;
  }
}

export class Certificate extends CertificateBase {


  /**Specifies whether the request was made for a parital or full certificate. */
  public fullCertificate: boolean = false;
  
    /**Get certificate compliance business information */
public businessInformation: CertificateBusinessInformation = new CertificateBusinessInformation();
  
public certificateType: string ="";

  constructor(registryId: string = '', guid: string ='', certificateType:string = '', fullCertificate: boolean = false ) {
    super(ENTITY_MODELS.PLANNING.CERTIFICATE, Certificate.createId(registryId, guid));
    this.registryId = registryId;
  }

  public static createId(registryId: string = '', guid: string = ''): string {
    if (!registryId || !guid)
      return '';
    return Entity.generateId(ENTITY_MODELS.PLANNING.REGISTRY_ITEM, registryId, ENTITY_MODELS.PLANNING.CERTIFICATE, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Certificate {
    return Object.assign(new Certificate(), source);
  }

  public static mapToEntityArray(source: Certificate[]): Certificate[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Certificate(), element));
    });
    return array;
  }
}

