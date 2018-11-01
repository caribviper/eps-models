import { Address } from './address';
export declare const OrganisationTitleValues: string[];
export declare class Contact {
    address: Address;
    company: string;
    firstname: string;
    lastname: string;
    title: string;
    email: string;
    telephone: string;
    mobile: string;
    middleName: string;
    constructor(address?: Address, company?: string, firstname?: string, lastname?: string, title?: string, email?: string, telephone?: string, mobile?: string);
    readonly isEmpty: boolean;
    readonly isCompany: boolean;
    readonly fullname: string;
    readonly fullnameWithTitle: string;
    readonly fullnameWithTitleCapitalise: string;
    clone(): Contact;
    static isEmpty(c: Contact): boolean;
    static clone(contact: Contact): Contact;
    static getFullname(c: Contact): string;
    static getFullnameWithTitle(contact: Contact): string;
    static isContactCompany(contact: Contact): boolean;
}
export declare class ContactEssentials {
    firstname: string;
    lastname: string;
    title: string;
    email: string;
    telephone: string;
    middleName: string;
    constructor(firstname: string, lastname: string, title?: string, email?: string, telephone?: string);
}
