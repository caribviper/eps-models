import { IRegistryDetails } from './../iregistry-details';
import { DateRange } from './../../common/date-range';
import { Assert } from 'caribviper-common';

export const TEMPORARY_DEVELOPMENT_TYPE = {
  ENTERTAINMENT: 'Entertainment Licence',
  BANNER: 'Banner',
  TENT: 'Tent or Other Temporary Structure'
};

/**
 * Temporary development application
 */
export class TemporaryDevelopment implements IRegistryDetails  {

  /**
   * Creates a temporary development
   * @param type Type of temporary development
   * @param description Description about the structure/event
   * @param dates Dates for when the structure should be up and for how long
   */
  constructor(public type: string, public description: string, public dates: DateRange[]) {
    Assert.isTruthy(type, 'Temporary Development type cannot be undefined/empty');
    Assert.isTruthy(description, 'Temporary Development description cannot be undefined/empty');
    Assert.isNonEmptyArray(dates, 'Temporary Development dates cannot be undefined/empty');
  }
}
