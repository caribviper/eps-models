import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';
import { Resource } from './resource';

/**
 * Manages the user/resource groups
 */
export class Group extends Entity {

  public groupName: string;
  public description: string;
  public pooled: boolean = false;
  public resources: string[] = [];

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
  public static createId(groupName: string): string {
    return Entity.generateId(ENTITY_MODELS.SECURITY.GROUP, groupName);
  }

  public static mapToEntity(source): Group {
    return Object.assign(new Group(), source);
  }

  public static mapToEntityArray(source: Group[]): Group[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Group(), element));
    });
    return array;
  }

  /** Ensures that the resource property has been initialised */
  private ensureResoureInitialised() {
    if(!this.resources)
      this.resources = [];
  }

  public addResource(resourceId: string) {
    this.ensureResoureInitialised();
    if(!resourceId) return;
    if(!this.resources.includes(resourceId))
      this.resources.push(resourceId);
  }

  public removeResource(resourceId: string) {
    this.ensureResoureInitialised();
    if(!resourceId) return;
    const index = this.resources.findIndex(r=>r === resourceId);
    if(index > - 1)
      this.resources.splice(index, 1);
  }
}
