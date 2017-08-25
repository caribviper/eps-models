/**
 * Creates a location for searching of entities, specifically registry items
 */
export class Projection {
  /**
   * Creates a new project for searching
   * @param version Stores the version of the projection indicating that the registry item should be fixed if older
   * @param locationFullAddress Full address of the site
   * @param primaryContactFullname Fullname of the primary contact
   * @param secondaryContactFullname Full name of the secondary contact
   */
  constructor(public version: string, public locationFullAddress: string, public primaryContactFullname: string = '', public secondaryContactFullname: string = '') {}
}
