import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';

export class ApplicationCounter extends Entity {

  /**Counter value being incremented */
  public counter: number = 0;

  /**
   * Creates an application counter for the specified application type
   * @param year Year of counter
   * @param applicationType Type of application being counted
   */
  constructor(public year: number = undefined, public applicationType: string = '') {
    super(ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, ApplicationCounter.createId(year, applicationType), true);
    this.counter = 0;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'ApplicationCounter cannot be transient');
    Assert.isTruthy(this.applicationType, 'ApplicationCounter applicationType cannot be undefined/empty');
    Assert.isTruthy(this.year, 'ApplicationCounter year cannot be undefined/empty');
    Assert.isTrue(this.year > 0, 'ApplicationCounter year cannot be less than 1')
  }

  /**Increments the counter value */
  public increment(): number {
    this.counter++;
    return this.counter;
  }

  public static createId(year: number, applicationType: string = ''): string {
    if (year < 1)
      throw new Error('ApplicationCounter cannot have a year less than 1');
    if (!applicationType)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, year.toString());
    return Entity.generateId(ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, year.toString(), applicationType);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: ApplicationCounter): ApplicationCounter {
    return Object.assign(new ApplicationCounter(), source);
  }
}
