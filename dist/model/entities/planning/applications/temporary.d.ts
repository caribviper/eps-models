import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
import { DateRange } from './../../../value-objects/common/date-range';
export declare const TEMPORARY_DEVELOPMENT_TYPE: {
    ENTERTAINMENT: string;
    BANNER: string;
    TENT: string;
};
export declare class TemporaryDevelopment extends RegistryDetails implements IRegistryDetails {
    type: string;
    dates: DateRange[];
    referenceNo: string;
    constructor(type?: string, dates?: DateRange[], referenceNo?: string);
    validateEntity(): void;
}
