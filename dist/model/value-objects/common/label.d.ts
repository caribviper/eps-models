import { Contact } from './contact';
export declare const LABEL_ADDRESS_TYPES: {
    APPLICANT: number;
    AGENT: number;
    LAND: number;
    CUSTOM: number;
};
export declare class Label {
    contact: Contact;
    referenceNo: string;
    displayName: string;
    description: string;
    dateReceived: Date;
    showReferenceNo: boolean;
    showDisplayName: boolean;
    showDescription: boolean;
    index: number;
    constructor(contact: Contact, referenceNo?: string, displayName?: string, description?: string, dateReceived?: Date);
    readonly isNewRow: boolean;
}
export declare class LabelSettings {
    addressType: number;
    referenceNo: string;
    copies: number;
    start_row: number;
    start_col: number;
    startDate: Date;
    endDate: Date;
    isRange: boolean;
    fileType: string;
    constructor();
    static RangeSearch(startDate: Date, endDate: Date, copies?: number, start_row?: number, start_col?: number): LabelSettings;
    static ReferenceSearch(referenceNo: string, addressType?: number, copies?: number, start_row?: number, start_col?: number): LabelSettings;
    static CustomLabel(copies?: number, start_row?: number, start_col?: number): LabelSettings;
}
