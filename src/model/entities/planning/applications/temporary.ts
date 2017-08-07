import { ENTITY_MODELS } from './../../entity-model-type';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
import { DateRange } from './../../../value-objects/common/date-range';
import { Assert } from 'caribviper-common';

export const TEMPORARY_DEVELOPMENT_TYPE = {
  ENTERTAINMENT: 'Entertainment Licence',
  BANNER: 'Banner',
  TENT: 'Tent or Other Temporary Structure'
};

/**
 * Temporary development application
 */
export class TemporaryDevelopment extends RegistryDetails implements IRegistryDetails {

  /**
   * Creates a temporary development
   * @param registryId linked registry id
   * @param type Type of temporary development
   * @param dates Dates for when the structure should be up and for how long
   */
  constructor(public registryId: string = '', public type: string = '', public dates: DateRange[] = []) {
    super(ENTITY_MODELS.REGISTRY_DETAILS.APPLICATIONS.TEMPORARY, TemporaryDevelopment.createId(registryId), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Temporary Development cannot be transient');
    Assert.isTruthy(this.registryId, 'Temporary Development registryId cannot be undefined/empty');
    Assert.isTruthy(this.type, 'Temporary Development type cannot be undefined/empty');
    Assert.isNonEmptyArray(this.dates, 'Temporary Development dates cannot be undefined/empty');
  }

  public static createId(registryId: string): string {
    return this.idHelper(registryId, ENTITY_MODELS.REGISTRY_DETAILS.APPLICATIONS.TEMPORARY);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: TemporaryDevelopment): TemporaryDevelopment {
    return Object.assign(new TemporaryDevelopment(), source);
  }
}
