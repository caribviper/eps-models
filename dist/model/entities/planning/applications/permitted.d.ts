import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
export declare class PermittedApplication extends RegistryDetails implements IRegistryDetails {
    officerComments: string;
    constructor();
    validateEntity(): void;
}
