import { Assert } from 'caribviper-common';

/**
 * Encapsulates the functionality of the activity
 */
export class WorkflowActivity {
  /**
   * Creates an activity template item
   * @param order Order in which activity appears
   * @param activity Details about the activity
   */
  constructor(public order: number, public activity: string, public estimatedDays: number) {
    Assert.isTrue(order > 0, 'Order of the activity must be greater than 0');
    Assert.isTruthy(activity, 'Activity cannot be undefined or empty');
    Assert.isTrue(estimatedDays > 0, 'The number of estimated days must be greater than 0');
  }
}
