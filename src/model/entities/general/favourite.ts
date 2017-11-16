import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';

/**
 * Favourite item of a specified user
 */
export class Favourite extends Entity {

  /**
   * Creates a new favoured item
   * @param referenceNo Reference number of the favoured item
   * @param registryId Registry id of the favoured item
   * @param username Username of the owner of the favoured item
   */
  constructor(public referenceNo: string = '', public registryId: string = '', public username: string = '') {
    super(ENTITY_MODELS.GENERAL.FAVOURITE, Favourite.createId(username, registryId), true);
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Favourite cannot be transient');
    Assert.isTruthy(this.referenceNo, 'Favourite reference number cannot be null/empty');
    Assert.isTruthy(this.registryId, 'Favourite registry id cannot be null');
    Assert.isTruthy(this.username, 'Favourite username cannot be null');
  }


  public static createId(username: string, registryId: string = ''): string {
    if (!username)
      return Entity.generateId(ENTITY_MODELS.GENERAL.FAVOURITE);
    if(!!username && !registryId)
      return Entity.generateId(ENTITY_MODELS.GENERAL.FAVOURITE, username);
    return Entity.generateId(ENTITY_MODELS.GENERAL.FAVOURITE, username, registryId);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Favourite {
    let favourite = Object.assign(new Favourite(), source);
    return favourite;
  }

  public static mapToEntityArray(source: Favourite[]): Favourite[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Favourite(), element));
    });
    return array;
  }

}
