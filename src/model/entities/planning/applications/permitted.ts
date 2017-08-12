import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../../entity-model-type';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';

export class PermittedApplication extends RegistryDetails implements IRegistryDetails {
  /**Comments by accepting officer. */
  officerComments: string;

  /**
   * Creates new Chattel details
   */
  constructor() {
    super();
  }

  public validateEntity() {
}

}
