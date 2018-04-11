import { Address } from './address';

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

  /**
   * Gets the full name of the contact inclusive
   */
  public get fullname(): string {
    let f: string = '';
    if (!!this.company)
      f = this.company;
    if (!!this.firstname)
      f = (f.length > 0) ? f.concat(', ', this.firstname) : this.firstname;
    if (!!this.lastname)
      f = (f.length > 0) ? f.concat(', ', this.lastname) : this.lastname;
    return f;
  }

  public get fullnameWithTitle(): string {
    let f: string = '';
    if (!!this.company)
      f = this.company;
    if (!!this.title)
      f = (f.length > 0) ? f.concat(', ', this.title) : this.title;
    if (!!this.firstname)
      f = (f.length > 0) ? f.concat(', ', this.firstname) : this.firstname;
    if (!!this.lastname)
      f = (f.length > 0) ? f.concat(', ', this.lastname) : this.lastname;
    return f;
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
