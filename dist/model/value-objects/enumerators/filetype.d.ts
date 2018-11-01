export declare const FILE_STATUS: {
    APPROVED: string;
    DENIED: string;
    DISMISSED: string;
    DRAFT: string;
    ENFORCEMENT: string;
    EXECUTUION: string;
    FINAL: string;
    INDEFINTE_DEFERAL: string;
    INVESTIGATING: string;
    ISSUED: string;
    LAPSED: string;
    PERMITTED: string;
    REFUSED: string;
    REVOCATED: string;
    SECTION37: string;
    STOPPED: string;
    SUBMITTED: string;
    WARNING: string;
    WITHDRAWN: string;
    ENFORCEMENT_EXECUTED: string;
    INDEFINTE_DEFFERAL: string;
};
export declare const FILE_STATUS_VALUES: {
    SUBMITTED: number;
    PERMITTED: number;
    REFUSED: number;
    WITHDRAWN: number;
    DRAFT: number;
    PERMISSION_LAPSED: number;
    ISSUED: number;
    DENIED: number;
    REVOCATED: number;
    INVESTIGATING: number;
    WARNING_NOTICE_SERVED: number;
    ENFORCEMENT_NOTICE_SERVED: number;
    STOP_NOTICE_SERVED: number;
    FINAL_NOTICE_SERVED: number;
    SECTION37_NOTICE_SERVED: number;
    ENFORCEMENT_EXECUTED: number;
    INDEFINTE_DEFFERAL: number;
    DISMISSED: number;
};
export declare class FileStatusFactory {
    private static dictionary;
    static convertToStringStatus(status: any): string;
}
export declare class FileType {
    displayName: string;
    folderPrefix: string;
    prefix: string;
    isApplication: boolean;
    constructor(displayName: string, folderPrefix: string, prefix: string, isApplication?: boolean);
}
export declare const COUNTER_PREFIXES: {
    prefix: string;
    description: string;
    type: string;
}[];
export declare const FILE_TYPES: {
    FORMAL: string;
    CHATTEL: string;
    PERMITTED: string;
    LISTED: string;
    TREE: string;
    UNAUTHORISED: string;
    COMPLAINT: string;
    ENQUIRY: string;
    ENFORCEMENT: string;
    CERTIFICATE: string;
    BUILDING_START: string;
    CONTINUING_USE: string;
    TEMPORARY_DEVELOPMENT: string;
};
export declare class RegistryFileTypes {
    private static _formal;
    private static _chattel;
    private static _permitted;
    private static _listed;
    private static _tree;
    private static _unauthorised;
    private static _complaint;
    private static _enquiry;
    private static _enforcement;
    private static _certificate;
    private static _continuingUse;
    private static _temporaryUse;
    static readonly formal: FileType;
    static readonly chattel: FileType;
    static readonly permitted: FileType;
    static readonly listed: FileType;
    static readonly tree: FileType;
    static readonly unauthorised: FileType;
    static readonly complaint: FileType;
    static readonly enquiry: FileType;
    static readonly enforcement: FileType;
    static readonly certificate: FileType;
    static readonly continuingUse: FileType;
    static readonly temporaryUse: FileType;
}
export declare const NOTICE_TYPE_PREFIXES: {
    WARNING: string;
    ENFORCEMENT: string;
    FINAL: string;
    STOP: string;
    SECTION37: string;
};
export declare class NoticeType {
    name: string;
    prefix: string;
    constructor(name: string, prefix: string);
    static getNoticeType(prefix: string): NoticeType;
}
export declare class RegistryNoticeTypes {
    static warning(): NoticeType;
    static enforcement(): NoticeType;
    static final(): NoticeType;
    static stop(): NoticeType;
    static section37(): NoticeType;
}
