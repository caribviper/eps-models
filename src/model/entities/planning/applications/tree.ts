import { ENTITY_MODELS } from './../../entity-model-type';
import { Assert } from 'caribviper-common';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';

/**
 * Permission to kill tree application
 */
export class KillTreeApplication extends RegistryDetails implements IRegistryDetails {

  /**Number of trees to be destroyed. */
  numberOfTrees: number;

  /**The types of trees to be destroyed. */
  typeOfTrees: string[];

  /**Reason(s) for terminating tree(s) */
  reasonForKilling: string;

  /**Directions to the site. */
  directionsToSite: string;

  /**Officer's Comments */
  OfficerComments: string;

  /**
   * Creates new Chattel details
   * @param registryId linked registry id
   */
  constructor(registryId: string = '') {
    super(ENTITY_MODELS.REGISTRY_DETAILS.APPLICATIONS.TREE, KillTreeApplication.createId(registryId), true);
    this.registryId = registryId;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'KillTreeApplication cannot be transient');
    Assert.isTruthy(this.registryId, 'KillTreeApplication registryId cannot be undefined/empty');
    Assert.isTruthy(this.numberOfTrees, 'KillTreeApplication number of trees cannot be undefined');
    Assert.isTrue(this.numberOfTrees > 0, 'KillTreeApplication number of trees cannot be less than 1');
    Assert.isTruthy(this.reasonForKilling, 'KillTreeApplication reason for killing cannot be undefined/empty');
  }

  public static createId(registryId: string): string {
    return this.idHelper(registryId, ENTITY_MODELS.REGISTRY_DETAILS.APPLICATIONS.TREE);
  }
}
