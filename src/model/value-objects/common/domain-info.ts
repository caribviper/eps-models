/**
 * Stores only domain id, code and name
 */
export class DomainInfo {
  /**
   * Creates a new domain info object
   * @param id Id of domain
   * @param code Code of an domain
   * @param name Name of an domain
   */
  constructor(public readonly id: string, public readonly code: string, public readonly name: string) { }
}
