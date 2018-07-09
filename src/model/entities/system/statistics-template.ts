import { Entity } from 'caribviper-entity';
import { ENTITY_MODELS } from '../../..';
import { Assert } from 'caribviper-common';

export class StatisticsTemplate extends Entity {
  constructor(public name: string = '', public template: string = '') {
    super(ENTITY_MODELS.SYSTEM.STATISTICS_TEMPLATE, StatisticsTemplate.createId(name), true);
  }
  public validateEntity() {
    Assert.isFalse(this.isTransient, 'StatisticsTemplate cannot be transient');
    Assert.isTruthy(this.name, 'StatisticsTemplate templateName cannot be undefined/empty');
  }

  public static createId(name: string = '') : string {
    if(!name)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.STATISTICS_TEMPLATE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.STATISTICS_TEMPLATE, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): StatisticsTemplate {
    return Object.assign(new StatisticsTemplate(), source);
  }

  public static mapToEntityArray(source: StatisticsTemplate[]): StatisticsTemplate[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new StatisticsTemplate(), element));
    });
    return array;
  }
}
