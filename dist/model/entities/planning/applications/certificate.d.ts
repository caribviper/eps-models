import { DispatchedInfo } from './../../../value-objects/common/dispatched-info';
import { UserInfo } from './../../../value-objects/common/userinfo';
import { Contact } from './../../../value-objects/common/contact';
export declare class BondedWarehouseInformation {
    floorSpace: number;
    materialsStored: string;
    constructor(floorSpace?: number, materialsStored?: string);
}
export declare class Certificate {
    subdivisionReferenceNo: string;
    subdivisionApprovalDate: Date;
    applicationReferenceNo: string;
    applicationApprovalDate: Date;
    certificationDate: Date;
    certifiedBy: UserInfo;
    lot: string;
    comments: string;
    documentId: string;
    registryId: string;
    certificateType: string;
    proposedDevelopment: string;
    fullCertificate: boolean;
    bondedWarehouseInformation: BondedWarehouseInformation;
    businessInformation: Contact;
    dispatchedInfo: DispatchedInfo;
    readonly isCertified: boolean;
    readonly canDispatch: boolean;
    certify(certifiedDate: Date, certifiedBy: UserInfo): void;
    dispatch(user: UserInfo, dispatchedDate: Date, description: string): void;
}
