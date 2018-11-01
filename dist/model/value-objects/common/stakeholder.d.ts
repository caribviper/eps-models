import { Contact } from './contact';
export declare const STAKEHOLDER_TYPES: {
    APPLICANT: string;
    APPLICANT_SECONDARY: string;
    AGENT: string;
    COMPLAINANT: string;
    OFFENDER: string;
    OWNER: string;
    OCCUPIER: string;
    NOTICEE: string;
    THIRD_PARTY: string;
    IGNORE: string;
    ASSOCIATED_ORGANISATION: string;
    AGENCY: string;
};
export declare class Stakeholder {
    contact: Contact;
    stakeholderType: string;
    active: boolean;
    secondaryType: string;
    constructor(contact: Contact, stakeholderType: string);
    readonly isEmpty: boolean;
    stringifyContact(): string;
    static isEmpty(stakeholder: Stakeholder): boolean;
}
