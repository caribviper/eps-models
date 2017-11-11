import { DispatchedInfo } from './../../../value-objects/common/dispatched-info';
import { ENTITY_MODELS } from './../../entity-model-type';
import { Assert } from 'caribviper-common';
import { FeeItem } from './../../../value-objects/common/fee-item';
import { UserInfo } from './../../../value-objects/common/userinfo';
import { Contact } from './../../../value-objects/common/contact';
import { Stakeholder, STAKEHOLDER_TYPES } from './../../../value-objects/common/stakeholder';
import { Entity } from 'caribviper-entity';

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

  /**Registry id of existing application */
  registryId: string = '';

  certificateType: string = '';

  /**Specifies whether the request was made for a parital or full certificate. */
  public fullCertificate: boolean = false;

  /**Get certificate compliance business information */
  public bondedWarehouseInformation: BondedWarehouseInformation;

  public businessInformation: Contact;

  /**dispatched infor */
  dispatchedInfo: DispatchedInfo = null;


  /**Gets whether certificate was certified */
  get isCertified(): boolean {
    return !!this.certificationDate;
  }

  public get canDispatch(): boolean {
    return this.isCertified && !this.dispatchedInfo;
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

  /**
   * Dispatches a certificate
   * @param user User dispatching certificate
   * @param dispatchedDate Date of dispatchment
   * @param description Description about dispatchment
   */
  public dispatch(user: UserInfo, dispatchedDate: Date, description: string) {
    if (!this.canDispatch)
      return;
    this.dispatchedInfo = new DispatchedInfo(user, dispatchedDate, description);
  }
}
