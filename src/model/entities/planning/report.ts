import { Assert, StringUtilities } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { UserInfo } from './../../value-objects/common/userinfo';
import { AttachedPicture } from './../../value-objects/planning/report';
import { BaseReport } from "./report-base";

/**Report that is associated with both enforcement and development control */
export class Report extends BaseReport {

  constructor(registryId: string = '', user: UserInfo = null, description: string = '') {
    super(ENTITY_MODELS.PLANNING.REPORT, Report.createId(registryId, (!user) ? '' : user.username), true);
    this.attachedPictures = [];
    this.author = user;
    this.dateCreated = new Date();
    this.description = description;
    this.registryId = registryId;
  }

  public static createId(registryId: string, username: string = ''): string {
    if (!registryId)
      return '';
    else if (!username)
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.REPORT);
    else
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.REPORT, username, Date.now().toString());
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Report {
    //fix content
    let report: Report = Object.assign(new Report(), source);
    report.content = StringUtilities.replaceAll(report.content, '\r\n', '<br />');
    if(report.content.indexOf('<p>') < 0)
      report.content = '<p>'+ report.content + '</p>';
    return report;
  }

  public static mapToEntityArray(source: Report[]): Report[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Report(), element));
    });
    return array;
  }
}
