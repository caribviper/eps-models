import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';

export class Job extends Entity {

  /**Id of the job currently executing */
  public jobInstanceId: string = '';

  /**
   * Creates a new job to added to the scheduler`
   * @param name Name and id of the job
   * @param funcName Name of the function to be executed 
   * @param jobTime Time the job is to be executed
   * @param description Description about the job to be executed
   */
  constructor(public name: string = '', public funcName: string = '', public jobTime: string | Date = '', public description: string = '') {
    super(ENTITY_MODELS.SYSTEM.JOB, name, true);
  }


  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.funcName, 'Must not be empty or null');
  }

  public static createId(name: string) {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.JOB);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.JOB, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Job {
    return Object.assign(new Job(), source);
  }

  public static mapToEntityArray(source: Job[]): Job[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Job(), element));
    });
    return array;
  }

}
