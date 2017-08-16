import { WorkflowActivity } from './../../value-objects/workflow/workflow-activity';
import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';

export class WorkflowTemplate extends Entity {

  activities: WorkflowActivity[] = [];

  /**
   * Creates a new workflow template
   * @param filePrefix Stores the file associated prefix
   * @param name Name of the template
   * @param description A breif descripton about the template
   */
  constructor(public name: string = '', public filePrefix: string = '', public description: string = '') {
    super(ENTITY_MODELS.SYSTEM.WORKFLOW_TEMPLATE, WorkflowTemplate.createId(name), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Cannot be transient');
    Assert.isTruthy(this.filePrefix, 'Must have a valid file prefix');
    Assert.isTruthy(this.name, 'Must have a valid name');
  }


  /**
   * Adds an activity to the workflow
   * @param activity description of activity
   * @param estimatedDays number of days to complete activity
   */
  addActivity(activity: string, estimatedDays: number) {
    this.activities.push(new WorkflowActivity(this.activities.length, activity, estimatedDays));
  }

  /**
   * Removes an activity and re-orders the remaining activities
   * @param activityIndex - Index position of activity
   */
  removeActivity(activityIndex: number) {
    //move activity to the bottom and reorder
    let totalSwaps = this.activities.length - (activityIndex + 1);
    for (let i: number = 0; i < totalSwaps; i++) {
      this.swap(activityIndex, activityIndex + 1);
      activityIndex++;
    }
    //remove activity now at bottom
    this.activities.splice(activityIndex, 1);
  }

  moveActivityUp(order: number) {
    if (!this.activities && this.activities.length < 1 && order < 1)
      return;
    this.swap(order, order - 1);
  }

  moveActivityDown(order: number) {
    if (!this.activities && this.activities.length < 1 && order > this.activities.length - 1)
      return;
    this.swap(order, order + 1);
  }

  private swap(index1: number, index2: number) {
    let tmp = this.activities[index1];
    this.activities[index1] = this.activities[index2];
    this.activities[index2] = tmp;
  }

  public static createId(name: string = ''): string {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.WORKFLOW_TEMPLATE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.WORKFLOW_TEMPLATE, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): WorkflowTemplate {
    return Object.assign(new WorkflowTemplate(), source);
  }

  public static mapToEntityArray(source: WorkflowTemplate[]): WorkflowTemplate[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new WorkflowTemplate(), element));
    });
    return array;
  }
}

export const WORKFLOW_STATES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  DEFERRED: 'deferred',
  CANCELED: 'canceled'
};
