import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

export class TaskShareItem {
  /**
   * Principle user account to be shared
   */
  public principle: UserInfo;

  /**
   * Users with access to the principle tasks
   */
  public users: UserInfo[];

  constructor() {
    this.principle = new UserInfo('', '', '');
    this.users = [];
  }
}

/**
 * Manages the sharing of a user's tasks with specified users
 */
export class TaskShare extends Entity {

  shares: TaskShareItem[] = [];

  constructor() {
    super(ENTITY_MODELS.SYSTEM.TASK_SHARE, TaskShare.createId(), true);
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
  }

  /**
   * sortShares Allow the share items to be sorted by principle
   */
  public sortShares() {
    this.shares = this.shares.sort((a, b) => {
      if (a.principle.username.toLowerCase() < b.principle.username.toLowerCase())
        return -1;
      if (b.principle.username.toLowerCase() < a.principle.username.toLowerCase())
        return 1;
      return 0
    });
  }

  /**
   * addShare Allow a TaskShareItem to be added
   * @param share TaskShareItem to be added
   */
  public addShare(share: TaskShareItem): boolean {
    if (!share || !share.principle || !share.users && share.users.length === 0)
      return false;
    share.principle.username = share.principle.username.toLowerCase();
    let index = this.shares.findIndex(s => s.principle.username.toLowerCase() === share.principle.username.toLowerCase());
    if (index > -1)
      this.shares[index].users = share.users;
    this.shares.push(share);
    return true;
  }

  /**
   * removeShare Removes specified TaskShareItem
   * @param username Username of the principle 
   */
  public removeShare(username: string) {
    if (this.shares.length === 0)
      return;
    let index = this.shares.findIndex(s => s.principle.username.toLowerCase() === username.toLowerCase());
    if (index < 0)
      return;
    this.shares.splice(index, 1);
  }

  /**
   * clearShares Removes all TaskShareItem
   */
  public clearShares() {
    this.shares = [];
  }

  public static createId() {
    return Entity.generateId(ENTITY_MODELS.SYSTEM.TASK_SHARE);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): TaskShare {
    return Object.assign(new TaskShare(), source);
  }

  public static mapToEntityArray(source: TaskShare[]): TaskShare[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new TaskShare(), element));
    });
    return array;
  }
}
