import { Assert } from 'caribviper-common';
/**
 * Encapsulates the file types
 */
export class FileType {
  /**
   * 
   * @param displayName Name displayed for the file type
   * @param storageArea Prefix location where files are stored
   * @param prefix Prefix forming part of application number
   * @param isApplication Specifies whether the file type is an application
   */
  constructor(public displayName: string, public storageArea: string, public prefix: string, public isApplication: boolean = false) {
    Assert.isTruthy(displayName, 'Display name cannot be undefined or empty');
  }
}

/**Registry file types */
export class RegistryFileTypes {
  private static _formal = new FileType('Formal Application', 'FA', '', true);
  private static _chattel = new FileType('Chattel Application', 'CH', '', true);
  private static _permitted = new FileType('Permitted Development Application', 'PD', '', true);
  private static _listed = new FileType('Listed Building Application', 'LB', '', true);
  private static _tree = new FileType('Tree Application', 'KT', '', true);

  private static _unauthorised = new FileType('Unauthorised Development', 'UA', '522', false);
  private static _complaint = new FileType('Complaint', 'FA', 'C', false);
  private static _enquiry = new FileType('Enquiry', 'E', '288', false);
  private static _enforcement = new FileType('Enforcement', 'EN', '', false);
  
  private static _certificate = new FileType('Certificate of Compliance', 'COC', 'COC', true);
  private static _buildingStart = new FileType('Building Start', 'BS', 'BS', true);
  private static _continuingUse = new FileType('Continuing Use Application', 'CC', 'CC', true);

  public static get formal() { return this._formal; }
  public static get chattel() { return this._chattel ; }
  public static get permitted() { return this._permitted; }
  public static get listed() { return this._listed; }
  public static get tree() { return this._tree; }

  public static get unauthorised() { return this._unauthorised; }
  private static get complaint() { return this._complaint; }
  private static get enquiry() { return this._enquiry; }
  private static get enforcement() { return this._enforcement; }
  
  private static get certificate() { return this._certificate; }
  private static get buildingStart() { return this._buildingStart; }
  private static get continuingUse() { return this._continuingUse; }
}
