import { IRegistryDetails } from './../iregistry-details';
import { InterestInLand, CategoryDescription, Materials } from "./../descriptive";

/**
 * Details of the chattel application
 */
export class ChattelApplication implements IRegistryDetails {
  /**Is the development in retention */
  retention: boolean;

  /**Comments by accepting officer. */
  OfficerComments: string;

  /**Applicant's interest in land. */
  interestInLand: InterestInLand;

  /**Description of current land uses. */
  currentLandUse: CategoryDescription;

  /**Proposed development. */
  proposedDevelopmentDescription: string;

  /**Proposed sewage disposal. */
  proposedSewageDisposal: string;

  /**Determines where the water source will be coming from. */
  proposedWater: string;

  /**Description of wall, roof materials. */
  materials: Materials;

  /**Determines if the foundation is solid or loose. */
  isFoundationSolid: boolean;

  /**Specifies whether the development has enforcement notice. */
  hasEnforcementNotice: boolean;

  /**Specifies the enforcement notice number. */
  enforcementNumber: string;

  constructor() {
    this.interestInLand = new InterestInLand();
    this.materials = new Materials();
    this.currentLandUse = new CategoryDescription('','');
  }
}
