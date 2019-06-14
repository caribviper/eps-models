import { DispatchedInfo } from './../../value-objects/common/dispatched-info';
import { FeeItem } from './../../value-objects/common/fee-item';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Contact } from './../../value-objects/common/contact';
import { DocumentEntity } from '../document-entity';
export declare class BuildingStart extends DocumentEntity {
    dateReceived: Date;
    acceptingUser: UserInfo;
    certificationDate: Date;
    certifiedBy: UserInfo;
    buildingNo: string;
    lotNumber: string;
    comments: string;
    documentId: string;
    registryId: string;
    fees: FeeItem;
    mailingAddress: Contact;
    dispatchedInfo: DispatchedInfo;
    commencementDate: Date;
    constructionStarted: boolean;
    completed: boolean;
    readonly isCertified: boolean;
    constructor(registryId?: string, guid?: string, commencementDate?: Date);
    validateEntity(): void;
    certify(certifiedDate: Date, certifiedBy: UserInfo): void;
    readonly canDispatch: boolean;
    dispatch(user: UserInfo, dispatchedDate: Date, description: string): void;
    static createId(registryId?: string, guid?: string): string;
    static mapToEntity(source: any): BuildingStart;
    static mapToEntityArray(source: BuildingStart[]): BuildingStart[];
}
