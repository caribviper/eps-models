import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';

/**
 * Stores the associated details of each registry application
 */
export interface IRegistryDetails { }

export abstract class RegistryDetails  {//extends Entity implements IRegistryDetails {

  public registryId: string;

  /**
   * Creates an id for registry details
   * @param registryId Id of the registry item
   * @param detailsType Type of details to be used within id
   */
  public static idHelper(registryId: string, detailsType: string) : string {
    if(!registryId || !detailsType)
      return '';
    return Entity.generateId(registryId, detailsType, Date.now().toString());
  }
}
