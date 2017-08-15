import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';
import { UserInfo } from './../../value-objects/common/userinfo';
import { AttachedPicture } from './../../value-objects/planning/report';
import { BaseReport } from "./report-base";

/**Report that is associated with both enforcement and development control */
export class Report extends BaseReport {

  constructor(registryId: string = '', user: UserInfo = null, description: string = '') {
    super(ENTITY_MODELS.PLANNING.REPORT, Report.createId(registryId, (!user) ? '': user.username), true);
    this.attachedPictures = [];
    this.author = user;
    this.dateCreated = new Date();
    this.description = description;
  }

  public static createId(registryId: string, username: string = ''): string {
    if(!registryId)
      return Entity.generateId(ENTITY_MODELS.PLANNING.REPORT);
    else if(!username)
      return Entity.generateId(ENTITY_MODELS.PLANNING.REPORT, registryId);
    else
      return Entity.generateId(ENTITY_MODELS.PLANNING.REPORT, registryId, username, Date.now().toString());
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: Report | Report[]): Report | Report[] {
    if (source instanceof Array) {
      if (source.length < 1)
        return [];
      let array = [];
      source.forEach(element => {
        array.push(Object.assign(new Report(), source));
      });
      return array;
    }
    else
      return Object.assign(new Report(), source);
  }
}
