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
    super()
  }

  validateEntity() {
    throw new Error("Method not implemented.");
  }


  public static createId(username: string, registryId: string): string {
    if (!username || !registryId)
      return Entity.generateId(ENTITY_MODELS.GENERAL.FAVOURITE);
    return Entity.generateId(ENTITY_MODELS.GENERAL.FAVOURITE, username, registryId);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Decision {
    let decision = Object.assign(new Decision(), source);
    decision.properties = Object.assign(new DecisionProperty('', false, null), decision.properties);
    return decision;
  }

  public static mapToEntityArray(source: Decision[]): Decision[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Decision(), element));
    });
    return array;
  }

}
