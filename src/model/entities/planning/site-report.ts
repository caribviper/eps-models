import { UserInfo } from './../../value-objects/common/userinfo';
import { Assert } from 'caribviper-common';
import { Entity } from 'caribviper-entity';
import { ENTITY_MODELS } from './../entity-model-type';
import { PolicyItem, SiteReportMeasurementGroup } from './../../value-objects/planning/report';
import { Report } from './report';

/**Site report with information describing the site as it relates to policies */
export abstract class SiteReport extends Report {

  /**Gets the date visited */
  dateVisited: Date = new Date();

  /**Get the policies of the site report. */
  policies: PolicyItem = new PolicyItem();

  public validateEntity() {
    super.validateEntity();
    Assert.isTruthy(this.dateVisited, 'Site Report must have a valid date visited');
  }
}

/**Development control site report data */
export class SiteReportDevelopment extends SiteReport {

  roadReserve: SiteReportMeasurementGroup = new SiteReportMeasurementGroup();
  buildingLine: SiteReportMeasurementGroup = new SiteReportMeasurementGroup();
  rearAndSideDistances: SiteReportMeasurementGroup = new SiteReportMeasurementGroup();


  /**Proposed distance from High Water Mark. */
  highWaterMark: number = 0;

  /**Distance from cliff edge */
  cliffEdge: number = 0;

  /**Number of parking spaces proposed. */
  noParkingSpacesProposed: number = 0;

  /**Number of parking spaces required. */
  noParkingSpacesRequired: number = 0;

  /**Number of floors/storeys proposed. */
  noFloors: number = 0;

  /**Proposed plot coverage as percentage. */
  proposedPlotCoverage: number = 0;

  /**Recommended plot coverage as percentage. */
  recommendedPlotCoverage: number = 0;

  /**Proposed plot ratio. */
  proposedPlotRatio: number = 0;

  /**Recommended plot ratio. */
  recommendedPlotRatio: number = 0;

  /**Proposed number of beds. */
  proposedBeds: number = 0;

  /**Recommmended number of beds. */
  recommendedBeds: number = 0;

  /**Number of existing buildings on site. */
  existingBuilding: number = 0;

  /**Proposal will damage mature trees on site. */
  treesAffected: boolean = false;

  /**Site contains walls, fences etc within the prescrined road reserve. */
  wallsOrEnclosures: boolean = false;

  constructor(registryId: string = '', user: UserInfo = null, description: string = '') {
    super(registryId, user, description)
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): SiteReportDevelopment {
    return Object.assign(new SiteReportDevelopment(), source);
  }

  public static mapToEntityArray(source: SiteReportDevelopment[]): SiteReportDevelopment[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new SiteReportDevelopment(), source));
    });
    return array;
  }

}

/**Enforcement site report data */
export class SiteReportEnforcement extends SiteReport {


  roadReserve: SiteReportMeasurementGroup = new SiteReportMeasurementGroup();
  buildingLine: SiteReportMeasurementGroup = new SiteReportMeasurementGroup();
  rearAndSideDistances: SiteReportMeasurementGroup = new SiteReportMeasurementGroup();

  /**Type of development. */
  typeOfDevelopment: string = '';

  /**Duration on site in weeks. */
  durationOnSite: number = 0;

  /**The water authority meter number on the property. */
  waterMeterNo: string;

  /**The electric utility meter number associated with the property. */
  electricityMeterNo: string;

  /**The land tax number of the property. */
  landTaxNo: string;

  constructor(registryId: string = '', user: UserInfo = null, description: string = '') {
    super(registryId, user, description)
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): SiteReportEnforcement {
    return Object.assign(new SiteReportEnforcement(), source);
  }

  public static mapToEntityArray(source: SiteReportEnforcement[]): SiteReportEnforcement[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new SiteReportEnforcement(), element));
    });
    return array;
  }

}
