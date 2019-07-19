import { Entity } from 'caribviper-entity';
export declare const StatsiticalReportType: {
    TABLE: string;
    CHART: string;
    TABLE_AND_CHART: string;
};
export declare class StatisticalReportTemplate extends Entity {
    name: string;
    description: string;
    reportType: string;
    query: string;
    parameters: any;
    constructor(name?: string);
    validateEntity(): void;
    static createId(name?: string): string;
    static mapToEntity(source: any): StatisticalReportTemplate;
    static mapToEntityArray(source: StatisticalReportTemplate[]): StatisticalReportTemplate[];
}
export declare class StatisticalReport {
    template: StatisticalReportTemplate;
    data: any;
    readonly timestamp: number;
    constructor(template: StatisticalReportTemplate, data?: any);
    static createCustomReport(data: any, reportType: string, query: string, ...parameters: any[]): StatisticalReport;
    private static generateCustomReportTemplate;
}
