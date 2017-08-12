import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../../entity-model-type';
import { Entity } from 'caribviper-entities';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
import { UserInfo } from './../../../value-objects/common/userinfo';

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

/**Certificate application */
export class Certificate extends RegistryDetails implements IRegistryDetails {

  /**Gets a referenced application registry id. */
  applicationRegistryId: string;

  /**Gets or sets the reference type, with respect to the reference Secondary file number. */
  subdivisionRegistryId: string;

  /**Date building start was certified. */
  certificationDate: Date;

  /**Get the user who certified the building start */
  certifiedBy: UserInfo;

  /**Gets the associated lotnumber */
  lotNumber: string;

  /**Gets the type of certificate */
  certificateType: string;

  /**Specifies whether the request was made for a parital or full certificate. */
  fullCertificate: boolean;

  /**Date construction began. */
  commencementDate: Date;

  /**Get certificate compliance business information */
  businessInformation: CertificateBusinessInformation;

  /**Specifies the comments assocaited with the certification of the document. */
  comments: string;

  /**Gets whether building start/certificate was certified */
  get certified(): boolean {
    return !this.certificationDate;
  }

  /**Get document id */
  documentId: string;

  /**
   * Creates a new blank certificate
   */
  constructor() {
    super();
  }

  public validateEntity() {
  }

}
