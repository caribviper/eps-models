import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

export class RegistryLogEntry extends Entity {

  constructor(public registryId?: string, public eventDate?: number, public description?: string, public category?: string) {
    super(ENTITY_MODELS.SYSTEM.REGISTRY_LOG_ENTRY, RegistryLogEntry.createId(registryId, eventDate));
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Registry log cannot be transient');
    Assert.isTruthy(this.registryId, 'Registry log must have a valid registry id');
    Assert.isTruthy(this.eventDate, 'Registry log must have a valid event date');
    Assert.isTruthy(this.eventDate, 'Registry log must have a valid description');
  }

  public static createId(registryId?: string, eventDate?: number) {
    if (!registryId)
      return '';
    if (!eventDate)
      return Entity.generateId(registryId, ENTITY_MODELS.SYSTEM.REGISTRY_LOG_ENTRY);
    return Entity.generateId(registryId, ENTITY_MODELS.SYSTEM.REGISTRY_LOG_ENTRY, eventDate.toString());
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): RegistryLogEntry {
    let o = Object.assign(new RegistryLogEntry(), source);
    return o;
  }

  public static mapToEntityArray(source: RegistryLogEntry[]): RegistryLogEntry[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      let o = Object.assign(new RegistryLogEntry(), element);
      array.push(o);
    });
    return array;
  }

}
