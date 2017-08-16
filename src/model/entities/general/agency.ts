import { Assert, Utilities } from 'caribviper-common';
import { Entity } from 'caribviper-entities';
import { ENTITY_MODELS } from './../entity-model-type';
import { Address } from './../../value-objects/common/address';
import { ContactEssentials, Contact } from "../../value-objects/common/contact";

/**
 * Manages agents
 */
export class Agency extends Entity {

  /**
   * Agency contact
   */
  public contact: Contact;

  /**Indicates whether the agency is a government site */
  public isGovernment: boolean = false;

  /**Indicates whether the agency can be used for consultancy */
  public consulting: boolean = false;

  /**Agency code for some agencies */
  public code: string = '';

  constructor(contact: Contact | string = '', guid: string = '') {
    super(ENTITY_MODELS.PLANNING.AGENCY, Agency.createId(guid), true);
    if (typeof contact !== 'string') {
      this.contact = contact;
    }
    else {
      this.contact = new Contact();
      this.contact.company = contact;
    }
    this.code = guid;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Agent cannot be transient');
    Assert.isTruthy(this.contact, 'Contact cannot be undefined');
    Assert.isTruthy(this.contact.company, 'Company name cannot be empty/undefined');
    Assert.isTruthy(this.contact.address, 'Must have a valid address');
  }

  public static createId(guid: string = undefined): string {
    if (!guid)
      return Entity.generateId(ENTITY_MODELS.PLANNING.AGENCY);
    return Entity.generateId(ENTITY_MODELS.PLANNING.AGENCY, guid);
  }

  public static mapToEntity(source): Agency {
    return Object.assign(new Agency(), source);
  }

  public static mapToEntityArray(source: Agency[]): Agency[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Agency(), element));
    });
    return array;
  }
}
