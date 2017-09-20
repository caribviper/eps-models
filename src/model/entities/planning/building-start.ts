import { FeeItem } from './../../value-objects/common/fee-item';
import { Stakeholder, STAKEHOLDER_TYPES } from './../../value-objects/common/stakeholder';
import { UserInfo } from './../../value-objects/common/userinfo';
import { ENTITY_MODELS } from './../entity-model-type';
import { Contact } from './../../value-objects/common/contact';
import { Assert } from 'caribviper-common';
import { Entity } from 'caribviper-entity';


export class BuildingStart extends Entity {

  //date received
  dateReceived: Date;

  acceptingUser: UserInfo;

  /**Date building start was certified. */
  certificationDate: Date;

  /**Get the user who certified the building start */
  certifiedBy: UserInfo;

  /**Building number */
  buildingNo: string = '';

  /**Gets the associated lotnumber */
  lotNumber: string = '';

  /**Specifies the comments assocaited with the certification of the document. */
  comments: string = '';

  /**Get document id */
  documentId: string = '';

  registryId: string = '';

  fee: FeeItem = new FeeItem();


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

  /**Date construction began. */
  public commencementDate: Date;

  constructor(registryId: string = '', guid: string = '', commencementDate: Date = null) {
    super(ENTITY_MODELS.PLANNING.BUILDING_START, BuildingStart.createId(registryId, guid));
    this.registryId = registryId;
    this.commencementDate = commencementDate;
  }

  public static createId(registryId: string = '', guid: string = ''): string {
    if (!registryId || !guid)
      return '';
    return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.BUILDING_START, guid);
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


