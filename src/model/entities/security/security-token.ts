import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

/**
 * Stores a refresh token information for determining access
 */
export class SecurityToken extends Entity {

  /** Is the token valid */
  public valid: boolean = true;

  /** The date the token was created. */
  public dateCreated: Date = new Date();

  /**
   * Creates a new security token entity
   * @param id Id of token
   * @param username Username of owner of token
   * @param token Token to be stored
   * @param expiresTimestamp Expiration date of token
   */
  constructor(id: string = '', public username: string = '', public token: string = '', public expiresTimestamp: number = undefined) {
    super(ENTITY_MODELS.SECURITY.USER_TOKEN, id);
    this.dateCreated = new Date();
  }

  /**
   * Check if the user token has expired. Empty tokens or invalid expire data will result in true
   */
  public hasExpired(): boolean { return !!this.expiresTimestamp ? this.expiresTimestamp < Date.now() : true; }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Entity cannot be transient');
    Assert.isTruthy(this.username, 'Username cannot be null/empty');
    Assert.isTruthy(this.expiresTimestamp, 'Expiration date cannot be null');
    Assert.isTruthy(this.token, 'Token cannot be null');
  }

  /**
   * Creates a user token id
   * @param id id reference
   */
  public static createId(id: string): string {
    return Entity.generateId(ENTITY_MODELS.SECURITY.USER_TOKEN, id);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): SecurityToken {
    return Object.assign(new SecurityToken(), source);
  }

  public static mapToEntityArray(source: SecurityToken[]): SecurityToken[] {
    if (source.length < 1)
      return [];
    const array = [];
    source.forEach(element => {
      array.push(Object.assign(new SecurityToken(), element));
    });
    return array;
  }
}
