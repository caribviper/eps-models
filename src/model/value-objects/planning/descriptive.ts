
/**Provides a description along with the category */
export class CategoryDescription {
  /**
   * Creates a new category description
   * @param category Name of the category
   * @param string Additional descriptive information
   */
  constructor(public category: string = '', public description: string ='') { }
}

/**
 * Provides description of a commercial property
 */
export class CommercialDescription {
  /**Is an industry */
  isIndustry: boolean = false;

  /**Description of businesses. */
  businessDescription: string = '';

  /**Description of disposal of refuge. */
  disposalOfRefuse: string = '';

  /**Estimated water usage per day. */
  estimatedWaterUsage: number = null;

  /**Estimated electricity usage per day. */
  estimatedElectricityUsage: number = null;

  /**Estimated number of employees. */
  estimatedEmployees: number = null;

  /**Description of hazardous material usage/storage if applicable. */
  hazardousMaterialDescription: string = '';

  /**Gets whether the proposed development involves the usage of hazardaous materials. */
  get involvesHazardousMaterial() { return this.hazardousMaterialDescription ? true : false; }
}

/**
 * Type of construction
 */
export class ConstructionType {
  /**
   * 
   * @param isNew Specifies whether the construction is new
   * @param isAddition Specifies whether the construction is an addition
   * @param description Description of the construction
   */
  constructor(public isNew: boolean, public isAddition: boolean, public description: string) { }
}

/**Specifies the interest in land and the details */
export class InterestInLand {
  /**Description of category */
  interestInLandCategory: string = '';

  /**Id of category */
  interestInLandCategoryId: number = 0;

  /**General description about interest */
  description: string = '';

  /**Specifies whether applicant has owner's consent */
  hasOwnersConsent: boolean = false;

  /**Specifies whether the land is bounded by a covenant. */
  boundByConvenants: boolean = false;
}

/**
 * Description on the types of materials
 */
export class Materials {
  /**Description of wall materials. */
  wall: string = 'NONE';

  /**Description of roof covering materials. */
  roofCovering: string = 'NONE';

  /**Description of roof support materials. */
  roofSupportOrFloor: string = 'NONE';

  /**Description of Roof covering - other */
  roofCoveringOther: string = 'NONE';
}
