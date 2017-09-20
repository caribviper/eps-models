import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';

export class ApplicationCounter extends Entity {

  /**Stores the associated registry identifier */
  registryId: string;
  /**
   * Creates an application counter for the specified application type
   * @param year Year of counter
   * @param applicationType Type of application being counted
   * @param counter Counter value
   */
  constructor(public year: number = 0, public applicationType: string = '', public counter: number = 0) {
    super(ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, ApplicationCounter.createId(year, applicationType), true);
    this.counter = 0;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'ApplicationCounter cannot be transient');
    Assert.isTruthy(this.applicationType, 'ApplicationCounter applicationType cannot be undefined/empty');
    Assert.isTruthy(this.year, 'ApplicationCounter year cannot be undefined/empty');
    Assert.isTrue(this.year > 0, 'ApplicationCounter year cannot be less than 1');
    Assert.isTruthy(this.counter, 'ApplicationCounter counter cannot be undefined');
    Assert.isTrue(this.counter > 0, 'ApplicationCounter counter cannot be less than 1');
    Assert.isTruthy(this.registryId, 'ApplicationCounter registry cannot be undefied/empty');
  }

  public static createId(year: number, applicationType: string = '', counter: number = 0): string {
    if (year < 1)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER);
    if (!applicationType)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, year.toString());
    if (counter < 1)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, year.toString(), applicationType);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER, year.toString(), applicationType, counter.toString());
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): ApplicationCounter {
    return Object.assign(new ApplicationCounter(), source);
  }

  public static mapToEntityArray(source: ApplicationCounter[]): ApplicationCounter[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new ApplicationCounter(), element));
    });
    return array;
  }
}
