/**
 * Stores only an organisation id and name
 */
export class OrganisationInfo {
  /**
   * Creates a new organisation info object
   * @param orgId Id of an organisation
   * @param name Name of an organisation
   */
  constructor(public readonly orgId: string, public name: string) { }
}
