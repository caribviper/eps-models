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

  public static createId(registryId: string, username: string = '', ...identifiers: string[]): string {
    if(!registryId)
      return Entity.generateId(ENTITY_MODELS.PLANNING.REPORT);
    else if(!username)
      return Entity.generateId(ENTITY_MODELS.PLANNING.REPORT, registryId);
    else if(!identifiers || identifiers.length< 1)
      return Entity.generateId(ENTITY_MODELS.PLANNING.REPORT, registryId, username, Date.now().toString());
    else
      return Entity.generateId(ENTITY_MODELS.PLANNING.REPORT, registryId, username, ...identifiers, Date.now().toString());
  }
}
