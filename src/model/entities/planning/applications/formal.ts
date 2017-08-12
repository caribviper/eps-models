import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../../entity-model-type';
import { IRegistryDetails, RegistryDetails } from './../iregistry-details';
import { ConstructionType, Materials, InterestInLand, CommercialDescription, CategoryDescription } from './../../../value-objects/planning/descriptive';
import { Measurements, FloorSpaceMeasurement } from './../../../value-objects/planning/measurement';

/**
 * Details of the formal application
 */
export class FormalApplication extends RegistryDetails implements IRegistryDetails {

  /**Specifies if the development is in retention */
  retention: boolean = false;

  /**Propose development to take place */
  proposedDevelopment: CategoryDescription;

	/**
	 * Type of formal applicaiton.
	 * These types can Building construction, subdivision, change of use of land/building,  mining or engineering.
	 */
  formalType: string;

  /**Applicant's interest in land. */
  interestInLand: InterestInLand = new InterestInLand();

  /**Description of proposed primary land uses. */
  proposedPrimaryLandUse: CategoryDescription = new CategoryDescription();

  /**Description of proposed secondary land uses. */
  proposedSecondaryLandUse: CategoryDescription = new CategoryDescription()

  /**Description of current land uses. */
  currentLandUse: CategoryDescription = new CategoryDescription()

  /**Specifies whether the development has enforcement notice. */
  hasEnforcementNotice: boolean = false;

  /**Specifies the enforcement notice number. */
  enforcementNumber: string = '';

  /**Description of the possible land uses available. */
  constructionTypes: ConstructionType[] = [];

  /**States the measurements associated with the application */
  measurements: Measurements = new Measurements();

  /**The number of lots to be created. */
  lotsToBeCreated: number = null;

	/**
	 * States whether a road has to be constructed.
	 * State whether dev involves use/construction of a vehicle access onto a road other than a Class IV road.
	 */
  constructionOfRoad: boolean = false;

  /**States whether development is on the coastline. */
  onCoastline: boolean = false;

  /**Board of health/CTP reference number. */
  referenceNo: string = '';

  /**Date board of health/CTP referenced application was approved. */
  referenceApprovalDate: Date = null;

	/**
	 * Description of commercial usage of application.
	 * The nature of the proposed industry or business.
	 */
  commercialDescription: CommercialDescription = new CommercialDescription();

  /**Proposed Water Source */
  proposedWaterSource: string = 'NONE';

  /**Existing Water Source */
  existingWaterSource: string = 'NONE';

  /**Proposed Water Source */
  proposedSewageDisposal: string = 'NONE';

  /**Existing Sewerage Disposal Source */
  existingSewageDisposal: string = 'NONE';

  /**Construction materials used */
  materials: Materials = new Materials();

  /**Measurements attributed to floor space. */
  floorSpaceDescription: FloorSpaceMeasurement = new FloorSpaceMeasurement();

  /**Number of floors/storeys to be created. */
  storeysCreated: number = 0;

  /**Height of building in metres. */
  buildingHeight: number = null;

	/**
	 * Number of units or buildings to be erected.
	 * Also used with building starts/certificates of compliance and appartments and townhouses.
	 */
  numberOfUnitsToBeErected: number = 0;

  /**Number of bedrooms proposed. */
  numberOfBedrooms: number = 0;

  /**Maximum seating capactity. */
  maximumSeatingCapacity: number = 0;

  /**Comments by accepting officer. */
  officerComments: string = 'N/A';

  /**Outline Application */
  outlineApplication: boolean = false;

  /**Gets whether there is a BoardOfHealth reference no. */
  get hasReferenceNo() { return this.referenceNo ? true : false; }

  get isSection18(): boolean {
    return (this.onCoastline ||
      (this.proposedPrimaryLandUse.category === 'AGRICULTURE' && this.measurements.areaOfSite > 8093.7128448));
  }

  /**
   * Creates new Formal details
   */
  constructor() {
    super();
    this.interestInLand = new InterestInLand();
    this.materials = new Materials();
    this.currentLandUse = new CategoryDescription('', '');
  }

  public validateEntity() {
    Assert.isTruthy(this.interestInLand, 'Formal interestInLand cannot be undefined');
    Assert.isTruthy(this.materials, 'Formal materials cannot be undefined');
    Assert.isTruthy(this.currentLandUse, 'Formal currentLandUse cannot be undefined');
    Assert.isTruthy(this.formalType, 'Formal formalType cannot be undefined/empty');
  }

}
