export declare class Address {
    parish: string;
    streetOne: string;
    streetTwo: string;
    lot: string;
    country: string;
    postalCode: string;
    inCareOf: string;
    constructor(parish: string, streetOne: string, streetTwo?: string, lot?: string, country?: string, postalCode?: string, inCareOf?: string);
    readonly isEmpty: boolean;
    readonly addressLine: string;
    readonly addressLineNoParish: string;
    readonly addressLineCapitalise: string;
    static cloneAddress(a: Address): Address;
    static stringifyAddress(address: Address, useParish?: boolean, useCountry?: boolean, titleCase?: boolean): string;
}
