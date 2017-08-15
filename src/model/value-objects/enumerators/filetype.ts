import { Assert } from 'caribviper-common';

/**All possible statuses */
export const FILE_STATUS = {
  APPROVED: 'Approved',
  DENIED: 'Denied',
  DISMISSED: 'Dismissed',
  DRAFT: 'Draft',
  ENFORCEMENT: 'Enforcement',
  EXECUTUION: 'Execution',
  FINAL: 'Final',
  INDEFINTE_DEFERAL: 'Indefinte Deferral',
  INVESTIGATING: 'Investigating',
  ISSUED: 'Issued',
  LAPSED: 'Lapsed',
  REFUSED: 'Refused',
  REVOCATED: 'Revocated',
  SECTION37: 'Section37',
  STOPPED: 'Stopped',
  SUBMITTED: 'Submitted',
  WARNING: 'Warning',
  WITHDRAWN: 'Withdrawn'
}

/**Used to get the string status of applications */
export class FileStatusFactory {
  private static dictionary = {
    '0': 'SUBMITTED',
    '1': 'PERMITTED',
    '2': 'REFUSED',
    '3': 'WITHDRAWN',
    '4': 'DRAFT',
    '5': 'PERMISSION LAPSED',
    '101': 'ISSUED',
    '102': 'DENIED',
    '103': 'REVOCATED',
    '200': 'INVESTIGATING',
    '201': 'WARNING NOTICE SERVED',
    '202': 'ENFORCEMENT NOTICE SERVED',
    '203': 'STOP NOTICE SERVED',
    '204': 'FINAL NOTICE SERVED',
    '205': 'SECTION37 NOTICE SERVED',
    '206': 'ENFORCEMENT EXECUTED',
    '207': 'INDEFINTE DEFFERAL',
    '208': 'DISMISSED'
  }
  /**
   * Converts numerical status to string status
   * @param status Numerical status to be converted to string
   */
  public static convertToStringStatus(status: any): string {
    return this.dictionary[status.toString()];

  }
}

/**
 * Encapsulates the file types
 */
export class FileType {
  /**
   * 
   * @param displayName Name displayed for the file type
   * @param folderPrefix Prefix location where files are stored
   * @param prefix Prefix forming part of application number
   * @param isApplication Specifies whether the file type is an application
   */
  constructor(public displayName: string, public folderPrefix: string, public prefix: string, public isApplication: boolean = false) {
    Assert.isTruthy(displayName, 'Display name cannot be undefined or empty');
  }
}

/**Types of file types */
export const FILE_TYPES = {
  FORMAL: 'Formal Application',
  CHATTEL: 'Chattel Application',
  PERMITTED: 'Permitted Development Application',
  LISTED: 'Listed Building Application',
  TREE: 'Tree Application',

  UNAUTHORISED: 'Unauthorised Development',
  COMPLAINT: 'Complaint',
  ENQUIRY: 'Enquiry',
  ENFORCEMENT: 'Enforcement',

  CERTIFICATE: 'Certificate of Compliance',
  BUILDING_START: 'Building Start',
  CONTINUING_USE: 'Continuing Use Application',
  TEMPORARY_DEVELOPMENT: 'Temporary Development of Land'
};

/**Registry file types */
export class RegistryFileTypes {
  private static _formal = new FileType(FILE_TYPES.FORMAL, 'FA', '', true);
  private static _chattel = new FileType(FILE_TYPES.CHATTEL, 'CH', '', true);
  private static _permitted = new FileType(FILE_TYPES.PERMITTED, 'PD', '', true);
  private static _listed = new FileType(FILE_TYPES.LISTED, 'LB', '', true);
  private static _tree = new FileType(FILE_TYPES.TREE, 'KT', 'T', true);

  private static _unauthorised = new FileType(FILE_TYPES.UNAUTHORISED, 'UA', '522', false);
  private static _complaint = new FileType(FILE_TYPES.COMPLAINT, 'C', '404', false);
  private static _enquiry = new FileType(FILE_TYPES.ENQUIRY, 'E', '288', false);
  private static _enforcement = new FileType(FILE_TYPES.ENFORCEMENT, 'EN', '', false);

  private static _certificate = new FileType(FILE_TYPES.CERTIFICATE, 'COC', 'COC', true);
  private static _buildingStart = new FileType(FILE_TYPES.BUILDING_START, 'BS', 'BS', true);
  private static _continuingUse = new FileType(FILE_TYPES.CONTINUING_USE, 'CC', 'CC', true);
  private static _temporaryUse = new FileType(FILE_TYPES.TEMPORARY_DEVELOPMENT, 'TT', 'TT', true);

  public static get formal() { return this._formal; }
  public static get chattel() { return this._chattel; }
  public static get permitted() { return this._permitted; }
  public static get listed() { return this._listed; }
  public static get tree() { return this._tree; }

  public static get unauthorised() { return this._unauthorised; }
  public static get complaint() { return this._complaint; }
  public static get enquiry() { return this._enquiry; }
  public static get enforcement() { return this._enforcement; }

  public static get certificate() { return this._certificate; }
  public static get buildingStart() { return this._buildingStart; }
  public static get continuingUse() { return this._continuingUse; }
  public static get temporaryUse() { return this._temporaryUse; }
}

/**Type of notice */
export class NoticeType {
  /**
   * Creates a new notice type
   * @param name Name of the notice
   * @param prefix prefix associated with notice
   */
  constructor(public name: string, public prefix: string) { }
}

export class RegistryNoticeTypes {
  public static warning(): NoticeType { return new NoticeType('warning', 'WN'); }
  public static enforcement(): NoticeType { return new NoticeType('enforcement', 'EN'); }
  public static final(): NoticeType { return new NoticeType('final', 'FN'); }
  public static stop(): NoticeType { return new NoticeType('stop', 'SN'); }
  public static section37(): NoticeType { return new NoticeType('warning', 'S37N'); }
}
