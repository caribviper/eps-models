import { ENTITY_MODELS } from './../../entity-model-type';
import { Assert } from 'caribviper-common';
import { FeeItem } from './../../../value-objects/common/fee-item';
import { UserInfo } from './../../../value-objects/common/userinfo';
import { Contact } from './../../../value-objects/common/contact';
import { Stakeholder, STAKEHOLDER_TYPES } from './../../../value-objects/common/stakeholder';
import { Entity } from 'caribviper-entities';

/** Provide information required for a Certificate Application without an original application */
export class BondedWarehouseInformation {
  /**Required floor space in metric. */
  floorSpace: number;

  /**Description of the materials to be stored if any. */
  materialsStored: string;

  constructor(floorSpace: number = 0, materialsStored: string = '') {
    this.floorSpace = floorSpace;
    this.materialsStored = materialsStored;
  }
}

export class Certificate {

  /**Gets or sets the reference type, with respect to the reference Secondary file number. */
  subdivisionReferenceNo: string = '';

  subdivisionApprovalDate: Date;

  applicationReferenceNo: string = '';
  applicationApprovalDate: Date;

  /**Date building start was certified. */
  certificationDate: Date;

  /**Get the user who certified the building start */
  certifiedBy: UserInfo;

  /**Gets the associated lotnumber */
  lot: string = '';

  /**Specifies the comments assocaited with the certification of the document. */
  comments: string = '';

  /**Get document id */
  documentId: string = '';

  registryId: string = '';

  fee: FeeItem = new FeeItem();

  certificateType: string = '';

  /**Specifies whether the request was made for a parital or full certificate. */
  public fullCertificate: boolean = false;

  /**Get certificate compliance business information */
  public bondedWarehouseInformation: BondedWarehouseInformation;

  public businessInformation: Contact;


  /**Gets whether building start/certificate was certified */
  get certified(): boolean {
    return !this.certificationDate;
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
