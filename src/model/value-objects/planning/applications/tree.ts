import { IRegistryDetails } from './../iregistry-details';

/**
 * Permission to kill tree application
 */
export class KillTreeApplication implements IRegistryDetails {

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
}
