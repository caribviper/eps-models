import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../../entity-model-type';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';

export class PermittedApplication extends RegistryDetails implements IRegistryDetails {
  /**Comments by accepting officer. */
  OfficerComments: string;

  /**
   * Creates new Chattel details
   * @param registryId linked registry id
   */
  constructor(registryId: string = '') {
    super(ENTITY_MODELS.APPLICATIONS.PERMITTED, PermittedApplication.createId(registryId), true);
    this.registryId = registryId;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Permitted Development cannot be transient');
    Assert.isTruthy(this.registryId, 'Permitted Development registryId cannot be undefined/empty');
  }

  public static createId(registryId: string): string {
    return this.idHelper(registryId, ENTITY_MODELS.APPLICATIONS.PERMITTED);
  }
}
