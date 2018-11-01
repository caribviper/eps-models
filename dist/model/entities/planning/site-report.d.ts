import { UserInfo } from './../../value-objects/common/userinfo';
import { PolicyItem, SiteReportMeasurementGroup } from './../../value-objects/planning/report';
import { Report } from './report';
export declare abstract class SiteReport extends Report {
    dateVisited: Date;
    policies: PolicyItem;
    validateEntity(): void;
}
export declare class SiteReportDevelopment extends SiteReport {
    roadReserve: SiteReportMeasurementGroup;
    buildingLine: SiteReportMeasurementGroup;
    rearAndSideDistances: SiteReportMeasurementGroup;
    highWaterMark: number;
    cliffEdge: number;
    noParkingSpacesProposed: number;
    noParkingSpacesRequired: number;
    noFloors: number;
    proposedPlotCoverage: number;
    recommendedPlotCoverage: number;
    proposedPlotRatio: number;
    recommendedPlotRatio: number;
    proposedBeds: number;
    recommendedBeds: number;
    existingBuilding: number;
    treesAffected: boolean;
    wallsOrEnclosures: boolean;
    constructor(registryId?: string, user?: UserInfo, description?: string);
    static mapToEntity(source: any): SiteReportDevelopment;
    static mapToEntityArray(source: SiteReportDevelopment[]): SiteReportDevelopment[];
}
export declare class SiteReportEnforcement extends SiteReport {
    roadReserve: SiteReportMeasurementGroup;
    buildingLine: SiteReportMeasurementGroup;
    rearAndSideDistances: SiteReportMeasurementGroup;
    typeOfDevelopment: string;
    durationOnSite: number;
    waterMeterNo: string;
    electricityMeterNo: string;
    landTaxNo: string;
    constructor(registryId?: string, user?: UserInfo, description?: string);
    static mapToEntity(source: any): SiteReportEnforcement;
    static mapToEntityArray(source: SiteReportEnforcement[]): SiteReportEnforcement[];
}
