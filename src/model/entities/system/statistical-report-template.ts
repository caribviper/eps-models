import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

export const StatsiticalReportType = {
  TABLE: 'table-only',
  CHART: 'chart-only',
  TABLE_AND_CHART: 'table-and-chart'
};
Object.freeze(StatsiticalReportType);

/**
 * Template for a statistical report
 */
export class StatisticalReportTemplate extends Entity {

  /**Name of the report */
  public name: string;

  /**Details of the report */
  public description: string;

  /**indicates if the report has a table */
  public reportType: string = StatsiticalReportType.TABLE;

  /**SQL function name or query to get data */
  public query: string;

  /**Query parameters to accompany the system */
  public parameters: any;

  /**
   * Creates a new statistical report
   * @param name Name of the report
   */
  constructor(name: string = '') {
    super(ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT_TEMPLATE, name, false);
    this.name = name;
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.name, 'Must have a valid name');
    Assert.isTruthy(this.description, 'Must have a valid description');
    Assert.isTruthy(this.query, 'Must have a valid query');;
  }

  public static createId(name: string = '') {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT_TEMPLATE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT_TEMPLATE, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): StatisticalReportTemplate {
    return Object.assign(new StatisticalReportTemplate(), source);
  }

  public static mapToEntityArray(source: StatisticalReportTemplate[]): StatisticalReportTemplate[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new StatisticalReportTemplate(), element));
    });
    return array;
  }
}

/**
 * Adds the data to the statistial report
 */
export class StatisticalReport {

  public readonly timestamp: number;

  /**
   * Creates a new StatisticalReport
   * @param template StatisticalReportTemplate with report template information
   * @param data Data used to generate chart/table
   */
  constructor(public template: StatisticalReportTemplate, public data: any = null) {
    Assert.isTruthy(template, 'StatisticalReportTemplate cannot be null');
    this.timestamp = new Date().getTime();
  }

  /**
   * Creates a new custom report when no template is supplied
   * @param data Data with report content
   * @param reportType Type of report to display
   * @param query Query that was executed
   * @param parameters Parameters passed to query
   */
  public static createCustomReport(data: any, reportType: string, query: string, ...parameters: any[]): StatisticalReport {
    let template = this.generateCustomReportTemplate(reportType, query, parameters);
    return new StatisticalReport(template, data);
  }
  

  /**
   * Generates a custom report template
   * @param reportType Type of report to display
   * @param query Query that was executed
   * @param parameters Parameters passed to query
   */
  private static generateCustomReportTemplate(reportType: string, query: string, ...parameters: any[]) : StatisticalReportTemplate {
    let template = new StatisticalReportTemplate('Custom Template - ' + new Date().getTime().toString());
    template.description = 'Custom template used with custom queries';
    template.query = query;
    template.parameters = parameters;
    template.reportType = reportType || StatsiticalReportType.TABLE_AND_CHART;
    return template;
  }
}
