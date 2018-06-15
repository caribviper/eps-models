/** Manages the type of policies to be implemented*/
export class PolicyItem {

  /**Water zone protection. */
  waterZone: number;

  /**Site located in Scotland District. */
  scotlandDistrict: boolean;

  /**Site located in National Park. */
  nationalPark: boolean;

  /**Site located within Noise Effect Forecast zone. */
  noiseEffectiveZone: boolean;

  /**Site located within Harrison Cave zone. */
  harrisonCave: boolean;

  /**Site located within Airport zone. */
  airport: boolean;

  /**Site located within and intergrated Rural Development Project area. */
  ruralDevelopmentArea: boolean;

  /**Site located within an area designated for urban development. */
  urbanDevelopmentArea: boolean;

  /**Site is a listed building. */
  listedBuilding: boolean;

  /**Site affected by drainage courses. */
  drainage: boolean;

  /**Site affected by world heritage. */
  worldHeritage: boolean;

  /**Site located within Arch Cot area. */
  archCotArea: boolean;
}

/**Pictures attached to reports */
export class AttachedPicture {

  /**
   * Creates a new AttachedPicture item
   * @param attachmentId Id of the attachment
   * @param filename Filename with path
   * @param caption Associated caption string
   */
  constructor(public attachmentId: string, public filename: string, public caption: string = '') { }
}

/**Measurements associated with site reports */
export class SiteReportMeasurementGroup {
  existing_North: number = 0;
  existing_South: number = 0;
  existing_East: number = 0;
  existing_West: number = 0;

  proposed_North: number = 0;
  proposed_South: number = 0;
  proposed_East: number = 0;
  proposed_West: number = 0;

  prescribed_North: number = 0;
  prescribed_South: number = 0;
  prescribed_East: number = 0;
  prescribed_West: number = 0;

}
