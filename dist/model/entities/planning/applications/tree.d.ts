import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
export declare class KillTreeApplication extends RegistryDetails implements IRegistryDetails {
    numberOfTrees: number;
    typeOfTrees: string;
    reasonForKilling: string;
    directionsToSite: string;
    officerComments: string;
    constructor();
    validateEntity(): void;
}
