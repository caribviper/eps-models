import { ENTITY_MODELS } from './../../entity-model-type';
import { Assert } from 'caribviper-common';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';

/**
 * Permission to kill tree application
 */
export class KillTreeApplication extends RegistryDetails implements IRegistryDetails {

  /**Number of trees to be destroyed. */
  numberOfTrees: number = 0;

  /**The types of trees to be destroyed. */
  typeOfTrees: string = '';

  /**Reason(s) for terminating tree(s) */
  reasonForKilling: string = '';

  /**Directions to the site. */
  directionsToSite: string = '';

  /**Officer's Comments */
  officerComments: string = '';

  /**
   * Creates new Chattel details
   */
  constructor() {
    super();
  }

  public validateEntity() {
    Assert.isTruthy(this.numberOfTrees, 'KillTreeApplication number of trees cannot be undefined');
    Assert.isTrue(this.numberOfTrees > 0, 'KillTreeApplication number of trees cannot be less than 1');
    Assert.isTruthy(this.reasonForKilling, 'KillTreeApplication reason for killing cannot be undefined/empty');
  }
}
