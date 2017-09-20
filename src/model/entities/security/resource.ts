import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';
/**
 * Resource item used to determine permissions
 */
export class Resource extends Entity {

  /**
   * Creates a resource
   * @param group Group resource belong to
   * @param url Resource url
   * @param verb Verb used to access resource
   * @param description Description about the resource
   */
  constructor(public url: string = '', public verb: string = '', public group: string = '', public description: string = '') {
    super(ENTITY_MODELS.SECURITY.RESOURCE, Resource.createId(url, verb), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Resource cannot be transient');
    Assert.isTruthy(this.url, 'Resource url cannot be empty/undefined');
    Assert.isTruthy(this.verb, 'Resource verb cannot be empty/undefined');
    Assert.isTruthy(this.group, 'Resource group cannot be empty/undefined');
    Assert.isTruthy(this.description, 'Resource description cannot be empty/undefined');
  }

  public static createId(url: string, verb: string): string {
    if (!url || !verb)
      return Entity.generateId(ENTITY_MODELS.SECURITY.RESOURCE);
    return Entity.generateId(ENTITY_MODELS.SECURITY.RESOURCE, url, verb);
  }

  public static mapToEntity(source): Resource {
    return Object.assign(new Resource(), source);
  }

  public static mapToEntityArray(source: Resource[]): Resource[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Resource(), element));
    });
    return array;
  }
}
