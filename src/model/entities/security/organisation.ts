import { ContactAttributes } from './../../value-objects/common/contact-attributes';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';
import { OrganisationInfo } from '../../value-objects/common/organisation-info';

/**
 * Manages the organisation a user is associated with
 */
export class Organisation extends Entity {

  /** Contact information associated with the organisation*/
  public contact: ContactAttributes = undefined;

  /** Stores the groups the organisation has access to */
  public groups: string[] = [];


  /**
   * Creates a new Organisation
   * @param orgId Shorten form of organisation name
   * @param name Name of the organisation
   * @param description A note about the organisation
   */
  constructor(public orgId: string = '', public name: string = '', public description: string = '') {
    super(ENTITY_MODELS.SECURITY.ORGANISATION, Organisation.createId(orgId), true);
    this.name = name;
    this.description = description;
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Organisation cannot be transient');
    Assert.isTruthy(this.orgId, 'Organisation id cannot be undefined/empty');
    Assert.isTruthy(this.name, 'Organisation name cannot be undefined/empty');
  }

  /**
   * Creates a new organisation id
   * @param orgId Name of organisation
   */
  public static createId(orgId: string = ''): string {
    if(!orgId)
      return Entity.generateId(ENTITY_MODELS.SECURITY.ORGANISATION);
    return Entity.generateId(ENTITY_MODELS.SECURITY.ORGANISATION, orgId);
  }

  public static mapToEntity(source): Organisation {
    return Object.assign(new Organisation(), source);
  }

  public static mapToEntityArray(source: Organisation[]): Organisation[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Organisation(), element));
    });
    return array;
  }

  public static toOrganisationInfo(organisation: Organisation): OrganisationInfo {
    if(!organisation)
      return undefined;
    return new OrganisationInfo(organisation.orgId, organisation.name);
  }

  public addGroup(group: string) {
    if (!this.groups) this.groups = [];
    if (!this.groups.includes(group))
      this.groups.push(group);
  }

  public removeGroup(group: string){ 
    if (!this.groups) this.groups = [];
    const index = this.groups.indexOf(group);
    if (index > -1)
      this.groups.splice(index, 1);
  }
}


