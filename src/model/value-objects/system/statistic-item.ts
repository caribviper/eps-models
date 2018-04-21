import { Assert } from 'caribviper-common';

/**
 * Manages the a specified statistics
 */
export class StatisticItem {
  /**
   * Creates a new StatisticItem
   * @param description Description of the statistic
   * @param value Value of the statistics
   * @param prefix Prefix used to identify item
   * @param group Group name used for grouping items
   */
  constructor(public description: string, public value: number, public prefix: string, public group: string) {
    Assert.isTruthy(description, 'Statistic item must have description');
  }
}

/**
 * Calculate statistics for the items inside
 */
export class GroupStatistics {
  /**
   * Creates a new group statistics
   * @param items StatisticItem to be used
   */
  constructor(public items: StatisticItem[] = []) { }

  protected static validate(items: StatisticItem[]) {
    Assert.isTruthy(items, 'Statistic items cannot be undefined');
    Assert.isTrue(items.length > 0, 'Statistic items cannot be empty');
  }

  /**Gets the total number of items */
  public get count(): number {
    return this.items.length;
  }

  /**
   * Gets the sum of the item values
   */
  public get sum(): number {
    return GroupStatistics.sum(this.items);
  }

  /**
   * Calculate the sum of the item values
   * @param items Statistic items to be summed
   */
  public static sum(items: StatisticItem[]): number {
    let value: number = 0;
    items.forEach(item => value += item.value);
    return value;
  }

  /**
   * Gets the average of the items
   */
  public get average(): number {
    return GroupStatistics.average(this.items);
  }

  /**
   * Calcualte the average of the items
   * @param items Statistic items to be averaged
   */
  public static average(items: StatisticItem[]): number {
    let value = GroupStatistics.sum(items);
    return value / items.length;
  }

  /**
   * Gets the percentages of the items
   */
  public get percentages(): StatisticItem[] {
    return GroupStatistics.percentages(this.items);
  }

  /**
   * Calculate the percentages of the items
   * @param items Statistic items to be converted to percentages
   */
  public static percentages(items: StatisticItem[]): StatisticItem[] {
    let percents: StatisticItem[];
    let sum = GroupStatistics.sum(items);
    items.forEach(item => {
      percents.push(new StatisticItem(item.description, item.value / sum, item.prefix, item.group));
    });
    return percents;
  }
}
