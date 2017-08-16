import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';
import { Assert } from 'caribviper-common';

/**Category information  */
export class CategoryNameValue {
  name: string;
  value: any;

  constructor(name: string, value: any = '') {
    this.name = name;
    this.value = value || name;
  }
}

/**
 * Stores Category
 */
export class Category extends Entity {

  /**
   * Creates a new Category
   * @param name Name of the category
   * @param values CategoryNameValues mapped to the category
   */
  constructor(public name: string = '', public values: CategoryNameValue[] = []) {
    super(ENTITY_MODELS.GENERAL.CATEGORY, Category.createId(name), true);
    this.values = values || [];
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Entity cannot be transient');
    Assert.isTruthy(this.name, 'Category name cannot be null/empty');
    Assert.isTruthy(this.values, 'Category values cannot be null');
  }

  /**
   * Creates a user token id
   * @param name Name of the category
   */
  public static createId(name: string): string {
    return Entity.generateId(ENTITY_MODELS.GENERAL.CATEGORY, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Category {
    return Object.assign(new Category(), source);
  }

  public static mapToEntityArray(source: Category[]): Category[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Category(), element));
    });
    return array;
  }
}
