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
    super(ENTITY_MODELS.REGISTRY_DETAILS.APPLICATIONS.PERMITTED, PermittedApplication.createId(registryId), true);
    this.registryId = registryId;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Permitted Development cannot be transient');
    Assert.isTruthy(this.registryId, 'Permitted Development registryId cannot be undefined/empty');
  }

  public static createId(registryId: string): string {
    return this.idHelper(registryId, ENTITY_MODELS.REGISTRY_DETAILS.APPLICATIONS.PERMITTED);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: PermittedApplication): PermittedApplication {
    return Object.assign(new PermittedApplication(), source);
  }
}
