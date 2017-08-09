import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';
import { Assert } from 'caribviper-common';

/**
 * Stores a user token information for detemrining current access
 */
export class UserToken extends Entity {

  /**
   * Username of the user owning token
   */
  public username: string;

  /**
   * Token to be stored
   */
  public token: string;

  /**
   * expiration date of token
   */
  public expires: number;

  /**
   * Is the token valid
   */
  public valid: boolean = true;

  /**
   * The date the token was created.
   */
  public dateCreated: Date = new Date();

  constructor(id: string = '', idHasType: boolean = false) {
    super(ENTITY_MODELS.SECURITY.USER_TOKEN, id, idHasType);
    this.dateCreated = new Date();
  }

  /**
   * Check if the user token has expired. Empty tokens or invalid expire data will result in true
   */
  public hasExpired(): boolean { return !this.expires ? this.expires < Date.now(): true; }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Entity cannot be transient');
    Assert.isTruthy(this.username, 'Username cannot be null/empty');
    Assert.isTruthy(this.expires, 'Expiration date cannot be null');
    Assert.isTruthy(this.token, 'Token cannot be null');
  }

  /**
   * Creates a new token
   * @param type Type of entity 
   * @param data 
   */
  public static createNew(data: { username: string, expires: number, token: string, valid: boolean }): UserToken {
    return Object.assign(new UserToken(this.createId(data.username, data.expires), true), data);
  }

  /**
   * Creates a user token id
   * @param username Username of the user the token belongs to
   * @param expires Date token is to expire
   */
  public static createId(username: string, expires: number = 0): string {
    return Entity.generateId(ENTITY_MODELS.SECURITY.USER_TOKEN, username, expires < 1 ? '' : expires.toString());
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: UserToken): UserToken {
    return Object.assign(new UserToken(), source);
  }
}
