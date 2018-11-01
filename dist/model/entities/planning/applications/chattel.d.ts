import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
import { InterestInLand, CategoryDescription, Materials } from './../../../value-objects/planning/descriptive';
export declare class ChattelApplication extends RegistryDetails implements IRegistryDetails {
    proposedDevelopment: string;
    officerComments: string;
    interestInLand: InterestInLand;
    currentLandUse: CategoryDescription;
    proposedSewageDisposal: string;
    proposedWater: string;
    materials: Materials;
    isFoundationSolid: boolean;
    hasEnforcementNotice: boolean;
    enforcementNumber: string;
    constructor();
    validateEntity(): void;
    static createId(registryId: string): string;
    static mapToEntity(source: ChattelApplication): ChattelApplication;
}
