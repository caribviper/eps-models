import { Assert } from 'caribviper-common';
import { UserInfo } from './../../value-objects/common/userinfo';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';

/**
 * Manages a dispatched item and it dispatched container
 */
export class DispatchedItemContainer {
  /**
   * Creates a new dispatched item container
   * @param dispatchedItem Dispatched log
   * @param reference Item that was dispatched
   */
  constructor(public dispatchedItem: DispatchedItem, public reference: Entity) { }
}

export class DispatchedItem extends Entity {
  /**
   * Creates a new DispatchedItem
   * @param registryId Id of the registry item
   * @param dispatchedDate Date referenced item was dispatched
   * @param referencedId Id of the referenced item
   * @param user User who dispatched item
   * @param itemType type of item dispatached
   * @param description Description about the item, usually title
   */
  constructor(public registryId: string = '', public dispatchedDate: Date = null, public referencedId: string = '', public user: UserInfo = null, public itemType: string = null, public description: string = null) {
    super(ENTITY_MODELS.PLANNING.DISPATCHED_ITEM, DispatchedItem.createId(registryId, (!user ? '' : user.username), dispatchedDate), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Dispatched item cannot be transient');
    Assert.isTruthy(this.registryId, 'Dispatched item registryId cannot be undefined/empty');
    Assert.isTruthy(this.dispatchedDate, 'Dispateched item date cannot be null');
    Assert.isTruthy(this.user, 'Dispatched item user cannot be null');
    Assert.isTruthy(this.description, 'Dispatched item description cannot be null');
  }

  public static createId(registryId: string, username: string = '', dispatchedDate: Date = null) {
    if (!dispatchedDate && !username)
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.DISPATCHED_ITEM);
    if (!!username && !dispatchedDate)
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.DISPATCHED_ITEM, username);
    else
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.DISPATCHED_ITEM, username, dispatchedDate.getTime().toString());
  }

  public static mapToEntity(source): DispatchedItem {
    return Object.assign(new DispatchedItem(), source);
  }

  public static mapToEntityArray(source: DispatchedItem[]): DispatchedItem[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new DispatchedItem(), element));
    });
    return array;
  }
}
