import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

/**Type of resource, which is either an 'api' or 'view' resource */
export type ResourceType = 'api' | 'view';

/**
 * Resource item used to determine permissions
 */
export class Resource extends Entity {

  /**
   * Creates a new resource
   * @param resourceType Type of resource
   * @param operation Operation of resource
   * @param category Category of resource
   * @param description Description about resource
   */
  constructor(public resourceType: ResourceType | string = 'api', public operation:string = '', public category: string = '', public description: string = '') {
    super(ENTITY_MODELS.SECURITY.RESOURCE, Resource.createId(resourceType, operation), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Resource cannot be transient');
    Assert.isTruthy(this.operation, 'Resource operation cannot be empty/undefined');
    Assert.isTruthy(this.category, 'Resource category cannot be empty/undefined');
    Assert.isTruthy(this.resourceType, 'Resource type cannot be empty/undefined');
  }

  public static createId(resourceType: ResourceType | string = '', operation:string = ''): string {
    if (!resourceType || !operation)
      return Entity.generateId(ENTITY_MODELS.SECURITY.RESOURCE);
    return Entity.generateId(ENTITY_MODELS.SECURITY.RESOURCE, resourceType, operation);
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
