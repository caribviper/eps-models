import { ENTITY_MODELS } from '../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

/**
 * Stores a refresh token information for determining access
 */
export class RefreshToken extends Entity {

  /** Is the token valid */
  public valid: boolean = true;

  /** The date the token was created. */
  public dateCreated: Date = new Date();

  /**
   * Creates a new refressh token entity
   * @param username Username of owner of token
   * @param tokenHash Encrypted token to be stored
   * @param expiresTimestamp Expiration date of token
   */
  constructor(public username: string = '', public tokenHash: string = '', public expiresTimestamp: number = undefined) {
    super(ENTITY_MODELS.SECURITY.REFRESH_TOKEN, username);
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
    Assert.isTruthy(this.tokenHash, 'Token cannot be null');
  }

  /**
   * Creates a user token id
   * @param username id reference
   */
  public static createId(username: string): string {
    return Entity.generateId(ENTITY_MODELS.SECURITY.REFRESH_TOKEN, username);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): RefreshToken {
    return Object.assign(new RefreshToken(), source);
  }

  public static mapToEntityArray(source: RefreshToken[]): RefreshToken[] {
    if (source.length < 1)
      return [];
    const array = [];
    source.forEach(element => {
      array.push(Object.assign(new RefreshToken(), element));
    });
    return array;
  }
}
