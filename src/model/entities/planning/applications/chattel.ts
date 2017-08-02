import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../../entity-model-type';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
import { InterestInLand, CategoryDescription, Materials } from './../../../value-objects/planning/descriptive';

/**
 * Details of the chattel application
 */
export class ChattelApplication extends RegistryDetails implements IRegistryDetails {

  /**Is the development in retention */
  retention: boolean;

  /**Comments by accepting officer. */
  OfficerComments: string;

  /**Applicant's interest in land. */
  interestInLand: InterestInLand;

  /**Description of current land uses. */
  currentLandUse: CategoryDescription;

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

  /**
   * Creates new Chattel details
   * @param registryId linked registry id
   */
  constructor(registryId: string = '') {
    super(ENTITY_MODELS.APPLICATIONS.CHATTEL, ChattelApplication.createId(registryId), true);
    this.registryId = registryId;
    this.interestInLand = new InterestInLand();
    this.materials = new Materials();
    this.currentLandUse = new CategoryDescription('', '');
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Chattel cannot be transient');
    Assert.isTruthy(this.registryId, 'Chattel registryId cannot be undefined/empty');
    Assert.isTruthy(this.interestInLand, 'Chattel interestInLand cannot be undefined');
    Assert.isTruthy(this.materials, 'Chattel materials cannot be undefined');
    Assert.isTruthy(this.currentLandUse, 'Chattel currentLandUse cannot be undefined');
  }

  public static createId(registryId: string): string {
    return this.idHelper(registryId, ENTITY_MODELS.APPLICATIONS.CHATTEL);
  }
}
