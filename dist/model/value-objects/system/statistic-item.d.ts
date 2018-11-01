export declare class StatisticItem {
    description: string;
    value: number;
    prefix: string;
    group: string;
    constructor(description: string, value: number, prefix: string, group: string);
}
export declare class GroupStatistics {
    items: StatisticItem[];
    constructor(items?: StatisticItem[]);
    protected static validate(items: StatisticItem[]): void;
    readonly count: number;
    readonly sum: number;
    static sum(items: StatisticItem[]): number;
    readonly average: number;
    static average(items: StatisticItem[]): number;
    readonly percentages: StatisticItem[];
    static percentages(items: StatisticItem[]): StatisticItem[];
}
