import { Contact } from './contact';

/**Types of stakeholders */
export const STAKEHOLDER_TYPES = {
  //Applicant
  APPLICANT: 'applicant',
  //Secondary applicant
  APPLICANT_SECONDARY: 'applicant secondary',
  //Agent acting on applicant(s) behalf
  AGENT: 'agent',
  //Person making complaint
  COMPLAINANT: 'complainant',
  //Person committing alleged offence
  OFFENDER: 'offender',
  //Person committing alleged offence
  OWNER: 'owner',
  //Person committing alleged offence
  OCCUPIER: 'occupier',
  //Person receiving notice
  NOTICEE: 'notice recipient',
  //Any other third party recipient
  THIRD_PARTY: 'third party',
  //Ignores the specified contact
  IGNORE: 'ignore contact',
  //An associated organisation
  ASSOCIATED_ORGANISATION: 'associated organisation',
  //associated
  AGENCY: 'government agency'
};

/** Details of the a stakeholder */
export class Stakeholder {
  /**Indicates if the stakeholder is active. A false indicates that the stakeholder was present but is no longer active */
  active: boolean;

  /**Possible secondary type to assist with notices and other areas that require two categories for stakeholder */
  secondaryType: string = '';

  /**
   * Creates a new stakeholder
   * @param contact Contact information of the stakeholder
   * @param stakeholderType Type of stakeholder
   */
  constructor(public contact: Contact, public stakeholderType: string) { }

  public get isEmpty(): boolean {
    return (!this.contact || Contact.isEmpty(this.contact));
  }

  /**
   * Converts a contact to a string
   */
  public stringifyContact(): string {
    return `${this.contact.firstname} ${this.contact.lastname}`;
  }

  public static isEmpty(stakeholder: Stakeholder): boolean {
    return !stakeholder || !stakeholder.contact || Contact.isEmpty(stakeholder.contact)
  }

}
