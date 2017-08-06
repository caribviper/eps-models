import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';
import { Assert } from 'caribviper-common';
import { Resource } from './resource';

/**
 * Manages the user/resource groups
 */
export class Group extends Entity {

  public groupName: string;
  public description: string;
  public pooled: boolean = false;
  public resources: Resource[] = [];

  /**
   * Creates a new Group
   * @param groupName Name of the group
   * @param pooled Indicates whether the group is pooled
   * @param resources Resources (url endpoints) group has access to
   * @param description A note about the group
   * @param pooled Indicates whether the group supports pooling
   */
  constructor(groupName: string = '', resources: Resource[] = [], description: string = '', pooled: boolean = false) {
    super(Entity.generateId(ENTITY_MODELS.SECURITY.GROUP, groupName));
    this.groupName = groupName;
    this.resources = [];
    this.description = description;
    this.pooled = pooled;
  }

  /**
   * Adds a resource
   * @param resource Resource to be added
   */
  addResource(resource: Resource) {
    if (this.resources.findIndex((r: Resource) => {
      return r.url.toLowerCase() === resource.url.toLowerCase() &&
        r.verb.toLowerCase() === resource.verb.toLowerCase();
    }) > -1)
      return;
    resource.validateResource();
    this.resources.push(resource);
  }

  /**
   * Removes a resource
   * @param resource Resource to be removed
   */
  removeResource(resource: Resource) {
    let index = this.resources.findIndex((r: Resource) => {
      return r.url.toLowerCase() === resource.url.toLowerCase() &&
        r.verb.toLowerCase() === resource.verb.toLowerCase();
    });
    if (index < 0)
      return;
    this.resources.splice(index, 1);
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Group cannot be transient');
    Assert.isTruthy(this.groupName, 'Group name cannot be undefined/empty');
    Assert.isTruthy(this.resources, 'Resources cannot be undefined/empty');
  }
  
  static createId(groupName: string) : string {
    return Entity.generateId(ENTITY_MODELS.SECURITY.GROUP, groupName);
  } 
}
