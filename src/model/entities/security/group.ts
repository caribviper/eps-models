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

  /**
   * Creates a new Group
   * @param groupName Name of the group
   * @param pooled Indicates whether the group is pooled
   * @param description A note about the group
   * @param pooled Indicates whether the group supports pooling
   */
  constructor(groupName: string = '', description: string = '', pooled: boolean = false) {
    super(ENTITY_MODELS.SECURITY.GROUP, Group.createId(groupName), true);
    this.groupName = groupName;
    this.description = description;
    this.pooled = pooled;
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Group cannot be transient');
    Assert.isTruthy(this.groupName, 'Group name cannot be undefined/empty');
  }
  
  /**
   * Creates a new group id
   * @param groupName Name of group
   */
  public static createId(groupName: string) : string {
    return Entity.generateId(ENTITY_MODELS.SECURITY.GROUP, groupName);
  } 

  public static mapToEntity(group: Group) : Group {
    return Object.assign(new Group(), group);
  }
}
