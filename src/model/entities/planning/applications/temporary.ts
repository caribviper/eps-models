import { ENTITY_MODELS } from './../../entity-model-type';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
import { DateRange } from './../../../value-objects/common/date-range';
import { Assert } from 'caribviper-common';

export const TEMPORARY_DEVELOPMENT_TYPE = {
  ENTERTAINMENT: 'Public Entertainment Licence',
  BANNER: 'Erection Banner',
  TENT: 'Erection of a Tent or Other Temporary Structure'
};

/**
 * Temporary development application
 */
export class TemporaryDevelopment extends RegistryDetails implements IRegistryDetails {

  /**
   * Creates a temporary development
   * @param type Type of temporary development
   * @param dates Dates for when the structure should be up and for how long
   * @param referenceNo Reference number used in conjunction with the site
   */
  constructor(public type: string = '', public dates: DateRange[] = [], public referenceNo: string = '') {
    super();
  }

  public validateEntity() {
    Assert.isTruthy(this.type, 'Temporary Development type cannot be undefined/empty');
    Assert.isNonEmptyArray(this.dates, 'Temporary Development dates cannot be undefined/empty');
  }
}
