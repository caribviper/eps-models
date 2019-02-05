import { Entity } from 'caribviper-entity';
import { ENTITY_MODELS } from '../../..';
import { Assert } from 'caribviper-common';

export const FILE_STATES = {
  LOCAL: 'local',
  REMOTE: 'remote',
  REPLICATED: 'replicatef'
};

export const FILE_EVENTS = {
  CREATED: 'created',
  DELETED: 'deleted'
};

export class FileEvent extends Entity {
  public date: Date;
  constructor(public registryId:string ='', public filePath: string ='', public state: string ='', public event: string ='') {
    super(ENTITY_MODELS.SYSTEM.FILE_EVENT, FileEvent.createId(filePath), true);
    this.date = new Date();
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'FileEvent cannot be transient');
    Assert.isTruthy(this.registryId, 'FileEvent must have a valid registry id');
    Assert.isTruthy(this.filePath, 'FileEvent must have a valid filepath');
    Assert.isTruthy(this.state, 'FileEvent must have a valid state');
    Assert.isTruthy(this.event, 'FileEvent must have a valid event');
  }

  public static createId(filepath: string = '') {
    if (!filepath)
      return '';
    return Entity.generateId(filepath, ENTITY_MODELS.SYSTEM.FILE_EVENT);
  }
  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): FileEvent {
    let o = Object.assign(new FileEvent(), source);
    return o;
  }

  public static mapToEntityArray(source: FileEvent[]): FileEvent[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      let o = Object.assign(new FileEvent(), element);
      array.push(o);
    });
    return array;
  }
}
