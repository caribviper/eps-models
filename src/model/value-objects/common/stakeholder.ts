import { Contact } from './contact';

/**Types of stakeholders */
export const STAKEHOLDER_TYPES = {
  APPLICANT: 'applicant',
  APPLICANT_SECONDARY: 'applicant secondary',
  AGENT: 'agent',
  COMPLAINANT: 'complainant',
  OFFENDER: 'offender',
  THIRD_PARTY: 'third party',
  ASSOCIATED_ORGANISATION: 'associated organisation'
};

/** Details of the a stakeholder */
export class Stakeholder {
  /**Indicates if the stakeholder is active. A false indicates that the stakeholder was present but is no longer active */
  active: boolean;

  /**
   * Creates a new stakeholder
   * @param contact Contact information of the stakeholder
   * @param stakeholderType Type of stakeholder
   */
  constructor(public contact: Contact, public stakeholderType: string) { }

  public isEmpty(): boolean {
    return (!this.contact || this.contact.isEmpty);
  }

  /**
   * Converts a contact to a string
   */
  public stringifyContact(): string {
    return `${this.contact.firstname} ${this.contact.lastname}`;
  }

}
