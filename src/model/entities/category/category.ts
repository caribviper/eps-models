import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';
import { Assert } from 'caribviper-common';

/**Category information  */
export class CategoryNameValue {
  name: string;
  value: any;

  constructor(name: string, value: any = '') {
    this.name = name;
    this.value = (!!value) ? value : name;
  }
}

/**
 * Stores Category
 */
export class Category extends Entity {
  /** Name of the category*/
  public name: string;
  /** CategoryNameValues mapped to the category*/
  public values: CategoryNameValue[] = [];

  /**
   * Creates a new Category
   * @param name Name of the category
   * @param values CategoryNameValues mapped to the category
   */
  constructor(name: string = '', values: CategoryNameValue[] = []) {
    super(ENTITY_MODELS.TYPES.CATEGORY, name);
    this.values = [];
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Entity cannot be transient');
    Assert.isTruthy(this.name, 'Username cannot be null/empty');
    Assert.isTruthy(this.values, 'Values cannot be null');
  }

  /**
   * Creates a user token id
   * @param name Name of the category
   */
  public static createId(name: string): string {
    return Entity.generateId(ENTITY_MODELS.TYPES.CATEGORY, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: any): Category {
    return Object.assign(new Category(), source);
  }
}
