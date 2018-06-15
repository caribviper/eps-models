import { StringUtilities } from 'caribviper-common';
import { Address } from './address';

export const OrganisationTitleValues: string[] = ['COMPANY', 'BARBADOS ASSOCIATION', 'THE GENERAL MANAGER', 'THE MANAGER', 'THE REGISTRAR'];

/**Encapsulates the contact information */
export class Contact {

  public middleName: string;

  /**
   * Creates a new contact
   * @param address Address of the contact
   * @param company Company associated with the contact
   * @param firstname Firstname of the contact
   * @param lastname Lastname of the contact
   * @param title Title of the contact
   * @param email Email address of the contact
   * @param telephone Telephone number of the contact
   * @param mobile Mobile number of the contact
   */
  constructor(public address: Address = new Address('', ''), public company: string = '', public firstname: string = '', public lastname: string = '', public title: string = '', public email: string = '', public telephone: string = '', public mobile: string = '') { }

  public get isEmpty(): boolean {
    return (!this.address || this.address.isEmpty) && !this.company && !this.lastname;
  }

  /**Gets whether the contact is a company */
  public get isCompany(): boolean {
    return Contact.isContactCompany(this);
  }

  /**
   * Gets the full name of the contact
   */
  public get fullname(): string {
    return Contact.getFullname(this);
  }

  /**Gets the full name of the contact with the title  */
  public get fullnameWithTitle(): string {
    return Contact.getFullnameWithTitle(this);
  }

  /**Get the full name of the contact as a lower case string */
  public get fullnameWithTitleCapitalise(): string {
    return StringUtilities.capitalize(Contact.getFullnameWithTitle(this));
  }

  //Creates a new contact
  public clone(): Contact {
    return Contact.clone(this);
  }

  public static isEmpty(c: Contact): boolean {
    return (!c.address || c.address.isEmpty) && !c.company && !c.lastname;
  }

  public static clone(contact: Contact): Contact {
    if (!contact)
      return null;
    if (!contact.address)
      return new Contact(null, contact.company, contact.firstname, contact.lastname, contact.title, contact.email, contact.telephone, contact.mobile);
    let a = new Address(contact.address.parish, contact.address.streetOne, contact.address.streetTwo, contact.address.lot, contact.address.country, contact.address.postalCode);
    a.inCareOf = contact.address.inCareOf;
    let c = new Contact(a, contact.company, contact.firstname, contact.lastname, contact.title, contact.email, contact.telephone, contact.mobile);
    return c;
  }

  public static getFullname(c: Contact): string {
    let f: string = '';
    let fullnameAlias = StringUtilities.replaceAll(`${c.firstname} ${c.middleName} ${c.lastname}`, '  ', ' ');
    if (!!c.company && c.company !== fullnameAlias)
      f = c.company;
    if (!!c.firstname) {
      f = (f.length > 0) ? f.concat(', ', c.firstname) : c.firstname;
    }
    if (!!c.lastname) {
      if (!c.firstname) {//then it was company information 
        //check to see if it is on list
        if (OrganisationTitleValues.indexOf(c.company))
          f = c.lastname;
        else
          f = (f.length > 0) ? f.concat(', ', c.lastname) : c.lastname;
      }
      else //previous text was firstname
        f = (f.length > 0) ? f.concat(' ', c.lastname) : c.lastname;
    }
    return f;
  }

  public static getFullnameWithTitle(contact: Contact): string {
    let f: string = '';
    if (!!contact.company)
      f = contact.company;
    if (!!contact.title)
      f = (f.length > 0) ? f.concat(', ', contact.title) : contact.title;

    if (!!contact.firstname) {
      if (!!contact.title)
        f = (f.length > 0) ? f.concat(' ', contact.firstname) : contact.firstname;
      else
        f = (f.length > 0) ? f.concat(', ', contact.firstname) : contact.firstname;
    }
    if (!!contact.lastname) {
      if (!contact.firstname) {//then it was company information 
        //check to see if it is on list
        if (OrganisationTitleValues.indexOf(contact.company))
          f = contact.lastname;
        else
          f = (f.length > 0) ? f.concat(', ', contact.lastname) : contact.lastname;
      }
      else //previous text was firstname
        f = (f.length > 0) ? f.concat(' ', contact.lastname) : contact.lastname;
    }
    return f;
  }

  public static isContactCompany(contact: Contact): boolean {
    return contact.fullname !== contact.company && !!contact.company;
  }
}

export class ContactEssentials {
  public middleName: string;

  /**
     * Creates a new contact
     * @param firstname Firstname of the contact
     * @param lastname Lastname of the contact
     * @param title Title of the contact
     * @param email Email address of the contact
     * @param telephone Telephone number of the contact
     */
  constructor(public firstname: string, public lastname: string, public title: string = '', public email: string = '', public telephone: string = '') { }

}
