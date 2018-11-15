import { ContactAttributes } from '../../value-objects/common/contact-attributes';
import { ENTITY_MODELS } from '../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';
import { DomainInfo } from '../../value-objects/common/domain-info';

/**
 * Manages the domain a user is associated with
 */
export class Domain extends Entity {

  /** Contact information associated with the domain*/
  public contact: ContactAttributes = undefined;

  /** Stores the groups the domain has access to */
  public groups: string[] = [];


  /**
   * Creates a new Domain
   * @param code Shorten form of domain name
   * @param name Name of the domain
   * @param description A note about the domain
   */
  constructor(public code: string = '', public name: string = '', public description: string = '') {
    super(ENTITY_MODELS.SECURITY.DOMAIN, Domain.createId(code), true);
    this.name = name;
    this.description = description;
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Domain cannot be transient');
    Assert.isTruthy(this.code, 'Domain code cannot be undefined/empty');
    Assert.isTruthy(this.name, 'Domain name cannot be undefined/empty');
  }

  /**
   * Creates a new domain id
   * @param code Name of domain
   */
  public static createId(code: string = ''): string {
    if(!code)
      return Entity.generateId(ENTITY_MODELS.SECURITY.DOMAIN);
    return Entity.generateId(ENTITY_MODELS.SECURITY.DOMAIN, code);
  }

  public static mapToEntity(source): Domain {
    return Object.assign(new Domain(), source);
  }

  public static mapToEntityArray(source: Domain[]): Domain[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Domain(), element));
    });
    return array;
  }

  public static toDomainInfo(domain: Domain): DomainInfo {
    if(!domain)
      return undefined;
    return new DomainInfo(domain._id, domain.code, domain.name);
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


