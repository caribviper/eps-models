import { Assert } from 'caribviper-common';
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
  contact: Contact;

  /**Indicates whether the agency is a government site */
  isGovernment: boolean = false;

  /**Indicates whether the agency can be used for consultancy */
  canConsultWith: boolean = false;

  constructor(contact: Contact | string = '') {
    super(ENTITY_MODELS.PLANNING.AGENT, Agency.createId(contact), true);
    if (typeof contact !== 'string') {
      this.contact = contact;
    }
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Agent cannot be transient');
    Assert.isTruthy(this.contact, 'Contact cannot be undefined');
    Assert.isTruthy(this.contact.company, 'Company name cannot be empty/undefined');
    Assert.isTruthy(this.contact.address, 'Must have a valid address');
  }

  public static createId(company: string | { firstname: string, lastname: string } = ''): string {
    let name: string = '';
    if (typeof company !== 'string')
      name = `${company.firstname}_${company.lastname}`
    else if (typeof company === undefined)
      name = '';
    else
      name = company;
    return Entity.generateId(ENTITY_MODELS.PLANNING.AGENT, name);
  }

  public static mapToEntity(source: Agency): Agency {
    return Object.assign(new Agency(), source);
  }
}
