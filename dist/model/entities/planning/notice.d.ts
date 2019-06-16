import { Stakeholder } from './../../value-objects/common/stakeholder';
import { NoticeType } from './../../value-objects/enumerators/filetype';
import { UserInfo } from './../../value-objects/common/userinfo';
import { EventRecord } from './../../value-objects/common/event-record';
import { DocumentEntity } from '../document-entity';
export declare class EnforcementNoticeDetails {
    location: string;
    infraction: string;
    requiredAction: string;
    constructor(location: string, infraction: string, requiredAction: string);
}
export declare class Notice extends DocumentEntity {
    registryId: string;
    noticeType: NoticeType;
    content: string;
    events: EventRecord;
    documentId: string;
    counterValue: number;
    noticeNo: string;
    stakeholders: Stakeholder[];
    area: string;
    completedDeveloment: boolean;
    enforcementNo: string;
    enforcementDate: Date;
    infractionStartDate: Date;
    infractionEndDate: Date;
    infraction: string;
    action: string;
    actionDate: Date;
    tcpContact: string;
    enforcementDetails: EnforcementNoticeDetails;
    formFields: any;
    constructor(registryId?: string, guid?: string, noticeType?: NoticeType, content?: string, user?: UserInfo);
    generateNo(area?: string): void;
    validateEntity(): void;
    sign(user: UserInfo): void;
    dispatch(user: UserInfo): void;
    static createId(registryId?: string, guid?: string): string;
    static mapToEntity(source: any): Notice;
    static mapToEntityArray(source: Notice[]): Notice[];
}
