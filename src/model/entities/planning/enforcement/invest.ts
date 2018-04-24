import { IRegistryDetails, RegistryDetails } from './../iregistry-details';

export class Invest extends RegistryDetails {

  public comments: string = '';
  public directionsToSite: string = '';
  public mainInvestigation: string = '';
  public offendingAction: string = '';

  //the official enforcable item
  public infraction: string = '';

  //Gets or sets the start date of the infraction
  public infractionStartDate: Date = null;

  //Gets or sets infraction end date
  public infractionEndDate: Date = null;
}
