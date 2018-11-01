export declare class CategoryDescription {
    category: string;
    description: string;
    constructor(category?: string, description?: string);
}
export declare class CommercialDescription {
    isIndustry: boolean;
    businessDescription: string;
    disposalOfRefuse: string;
    estimatedWaterUsage: number;
    estimatedElectricityUsage: number;
    estimatedEmployees: number;
    hazardousMaterialDescription: string;
    readonly involvesHazardousMaterial: boolean;
}
export declare class ConstructionType {
    isNew: boolean;
    isAddition: boolean;
    description: string;
    constructor(isNew: boolean, isAddition: boolean, description: string);
}
export declare class InterestInLand {
    interestInLandCategory: string;
    interestInLandCategoryId: number;
    description: string;
    hasOwnersConsent: boolean;
    boundByConvenants: boolean;
}
export declare class Materials {
    wall: string;
    roofCovering: string;
    roofSupportOrFloor: string;
    roofCoveringOther: string;
}
