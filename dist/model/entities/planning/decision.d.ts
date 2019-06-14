import { DecisionItemTemplate } from './../system/decision-template';
import { UserInfo } from './../../value-objects/common/userinfo';
import { DocumentEntity } from '../document-entity';
export declare const DECISION_AUTHORITY: {
    CTP: {
        name: string;
        value: number;
    };
    MINISTER: {
        name: string;
        value: number;
    };
};
export declare class DecisionItem {
    order: number;
    itemNumber: number;
    templateType: string;
    description: string;
    rationale: string;
    constructor(order: number, template: DecisionItemTemplate);
}
export declare class DecisionProperty {
    authority: string;
    approved: boolean;
    withdrawn: boolean;
    created: Date;
    preparedBy: UserInfo;
    signed: Date;
    signingUser: UserInfo;
    dispatched: Date;
    dispatchingUser: UserInfo;
    appealed: Date;
    documentId: string;
    readonly isFinalised: boolean;
    constructor(authority: string, approved: boolean, preparedBy: UserInfo);
    ensureNotFinalised(): void;
    dispatch(ctpUser: UserInfo): void;
    sign(ctpUser?: UserInfo): void;
    loggedAppeal(appealDate: Date): void;
    validateProperty(): void;
}
export declare class Decision extends DocumentEntity {
    registryId: string;
    properties: DecisionProperty;
    decisionItems: DecisionItem[];
    ministerialContent: string;
    forceNewLineForConditions: boolean;
    forceNewLineForConditionsReasons: boolean;
    forceNewLineForClause: boolean;
    forceNewLineForRefusals: boolean;
    constructor(registryId?: string, guid?: string);
    validateEntity(): void;
    readonly approved: boolean;
    readonly withdrawn: boolean;
    readonly finalised: boolean;
    readonly conditions: DecisionItem[];
    readonly clauses: DecisionItem[];
    readonly refusals: DecisionItem[];
    sortDecisionItems(): void;
    static createNew(registryId: string, guid: string, approved: boolean, preparedBy: UserInfo): Decision;
    static createId(registryId: string, guid?: string): string;
    static mapToEntity(source: any): Decision;
    static mapToEntityArray(source: Decision[]): Decision[];
}
