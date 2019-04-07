import { Feature } from './../../value-objects/geometry/geo-data';
import { RegistryFlatTable } from './../../value-objects/planning/registry-flat-table';
import { Projection } from './../../value-objects/common/projection';
import { RegistryDetails } from './iregistry-details';
import { FileType } from './../../value-objects/enumerators/filetype';
import { FeeItem } from './../../value-objects/common/fee-item';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Address } from './../../value-objects/common/address';
import { Entity } from 'caribviper-entity';
import { Stakeholder } from "../../value-objects/common/stakeholder";
export declare class Coordinate {
    x: number;
    y: number;
    datePlotted: number;
    landTaxId: string;
    landUse: string;
    lotsCreated: string;
    constructor(x?: number, y?: number);
}
export declare class CrossReferenceItem {
    registryItemId: string;
    referenceNo: string;
    systemLink: boolean;
    constructor(registryItemId: string, referenceNo: string, systemLink?: boolean);
}
export declare class Milestone {
    date: Date;
    type: string;
    comment: string;
    dateCreated: Date;
    constructor(date: Date, type: string, comment: string, dateCreated: Date);
}
export declare class Location {
    address: Address;
    coordinate: Coordinate;
    parcel: string;
    landTaxNo: string;
    validated: boolean;
    feature: Feature;
    constructor(address: Address, coordinate: Coordinate, parcel?: string, landTaxNo?: string, validated?: boolean);
    readonly isEmpty: boolean;
    stringifyAddress(): string;
    static convertToGeoJson(location: Location): boolean;
    static appendNewGeoJson(location: Location, x: number, y: number): boolean;
}
export declare class RegistryItem extends Entity {
    referenceNo: string;
    counterValue: number;
    area: string;
    location: Location;
    subDivisionNumber: string;
    subDivisionNumberApprovalDate: Date;
    dateReceived: Date;
    dateLastModified: Date;
    fileType: FileType;
    status: any;
    acceptingUser: UserInfo;
    workflowInfo: any;
    stakeholders: Stakeholder[];
    crossReferences: CrossReferenceItem[];
    milestones: Milestone[];
    fees: FeeItem;
    details: RegistryDetails;
    registryId: string;
    projection: Projection;
    reportTags: string[];
    constructor(fileType?: FileType, guid?: string);
    readonly storageFolder: string;
    readonly landDescription: string;
    readonly hasValidAgent: boolean;
    readonly agent: Stakeholder;
    readonly hasValidApplicant: boolean;
    readonly applicant: Stakeholder;
    readonly mainStakeholder: Stakeholder;
    readonly offender: Stakeholder;
    readonly complainant: Stakeholder;
    readonly otherApplicants: Stakeholder[];
    readonly nonAgentNorComplainantStakeholders: Stakeholder[];
    readonly registryStatus: string;
    readonly hasOtherApplicants: boolean;
    getStakeholderContactFullname(s: Stakeholder): string;
    validateEntity(): void;
    createReferenceNumber(counterValue?: number): void;
    static createProjection(registry: RegistryItem): Projection;
    static createId(fileType?: FileType, guid?: string): string;
    static mapToEntity(source: RegistryItem | Entity): RegistryItem;
    static mapToEntityArray(source: RegistryItem[]): RegistryItem[];
    static convertToRegistryFlatFile(registry: RegistryItem): RegistryFlatTable;
}
