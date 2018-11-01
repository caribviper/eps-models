export declare class PolicyItem {
    waterZone: number;
    scotlandDistrict: boolean;
    nationalPark: boolean;
    noiseEffectiveZone: boolean;
    harrisonCave: boolean;
    airport: boolean;
    ruralDevelopmentArea: boolean;
    urbanDevelopmentArea: boolean;
    listedBuilding: boolean;
    drainage: boolean;
    worldHeritage: boolean;
    archCotArea: boolean;
}
export declare class AttachedPicture {
    attachmentId: string;
    filename: string;
    caption: string;
    constructor(attachmentId: string, filename: string, caption?: string);
}
export declare class SiteReportMeasurementGroup {
    existing_North: number;
    existing_South: number;
    existing_East: number;
    existing_West: number;
    proposed_North: number;
    proposed_South: number;
    proposed_East: number;
    proposed_West: number;
    prescribed_North: number;
    prescribed_South: number;
    prescribed_East: number;
    prescribed_West: number;
}
