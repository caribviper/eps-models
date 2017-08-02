import { Assert } from 'caribviper-common';

/**
 * Captures the number of days from the start date
 */
export class DateRange {
  
  /**
   * 
   * @param date Start date
   * @param days Number of days for range
   */
  constructor(public date: Date, public days: number) {
    Assert.isTruthy(date, 'DateRange date cannot be undefined');
    Assert.isTruthy(days, 'DateRange days cannot be undefined');
    Assert.isTrue(days>0, 'DateRange days cannot be less than 1');
   }

}
