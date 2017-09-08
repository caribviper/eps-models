/**
 * Creates a location for searching of entities, specifically registry items
 */
export class Projection {
  /**
   * Creates a new project for searching
   * @param version Stores the version of the projection indicating that the registry item should be fixed if older
   * @param location Full address of the site
   * @param primaryContact Fullname of the primary contact
   * @param secondaryContact Full name of the secondary contact
   * @param description Gets a brief description about the registry item
   */
  constructor(public version: string, public location: string, public primaryContact: string = '', public secondaryContact: string = '', public description = "") {}
}
