import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';
import { UserInfo } from './../../value-objects/common/userinfo';
import { AttachedPicture } from './../../value-objects/planning/report';

export abstract class BaseReport extends Entity {

  /**Get comments and assessments. */
  content: string = '';  

  /**Recommendations */
  recommendations: string = '';

  /**Specifies description about the type of site. */
  description: string = '';

  /**Date site report was attached. */
  dateAttached: Date;

  /**Date site report was created. */
  dateCreated: Date  = new Date();

  /**Attached pictures */
  attachedPictures: AttachedPicture[];

  /**Owner of the site report. */
  author: UserInfo;

  /**Get associated document id. */
  documentId: string;

  /**Gets the associated registry item */
  registryId: string;

  /**Indicates if the report has been finalised */
  get isFinalised(): boolean {
    return !this.dateAttached;
  }
  
  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Report cannot be transient');
    Assert.isTruthy(this.registryId, 'Report must have valid registry item id');
    Assert.isTruthy(this.author, 'Report must have a valid author');
    Assert.isTruthy(this.dateCreated, 'Report must have a valid creation date');
    Assert.isTruthy(this.description, 'Report must have a valid description from the registry item');
  }

  /**
   * Ensure that the report has not been finalised and if so throws error
   */
  public ensureNotFinalise() {    
    if(this.isFinalised)
      throw new Error('Report is already finalised');
  }
  
/**
 * Updates the content and recommendations
 * @param content Content/assessment about registry item
 * @param recommendations Recommendations about registry item
 */
  public updateContent(content: string, recommendations: string = '') {
    this.ensureNotFinalise();
    this.content = content;
    this.recommendations = recommendations;
    this.update();
  }

  /**
   * Attaches the report and makes it final
   */
  public attachReport() {
    this.ensureNotFinalise();
    this.dateAttached = new Date();
    this.update();
  }
}
