import { Assert } from 'caribviper-common';

/**All possible statuses */
export const FILE_STATUS = {
  APPROVED: 'Approved',
  DENIED: 'Denied',
  DISMISSED: 'Dismissed',
  DRAFT: 'Draft',
  ENFORCEMENT: 'Enforcement Notice Served',
  EXECUTUION: 'Execution',
  FINAL: 'Final Notice Served',
  INDEFINTE_DEFERAL: 'Indefinte Deferral',
  INVESTIGATING: 'Investigating',
  ISSUED: 'Issued',
  LAPSED: 'Lapsed',
  PERMITTED: 'Permitted',
  REFUSED: 'Refused',
  REVOCATED: 'Revocated',
  SECTION37: 'Section37 Letter',
  STOPPED: 'Stop Notice Served',
  SUBMITTED: 'Submitted',
  WARNING: 'Warning Notice Served',
  WITHDRAWN: 'Withdrawn',
  ENFORCEMENT_EXECUTED: 'Enforcement Executed',
  INDEFINTE_DEFFERAL: 'Indefinite Defferal'
}

export const FILE_STATUS_VALUES = {
  SUBMITTED: 0,
  PERMITTED: 1,
  REFUSED: 2,
  WITHDRAWN: 3,
  DRAFT: 4,
  PERMISSION_LAPSED: 5,
  ISSUED: 101,
  DENIED: 102,
  REVOCATED: 103,
  INVESTIGATING: 200,
  WARNING_NOTICE_SERVED: 201,
  ENFORCEMENT_NOTICE_SERVED: 202,
  STOP_NOTICE_SERVED: 203,
  FINAL_NOTICE_SERVED: 204,
  SECTION37_NOTICE_SERVED: 205,
  ENFORCEMENT_EXECUTED: 206,
  INDEFINTE_DEFFERAL: 207,
  DISMISSED: 208
};

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
    let convertedStatus: string;
    try {
      convertedStatus = this.dictionary[status.toString()];
      if (convertedStatus === undefined || !convertedStatus)
        convertedStatus = status;
    } catch (error) {
      convertedStatus = 'N/A';
    }
    return convertedStatus;

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

//Prefixes for the the various counter files
//
export const COUNTER_PREFIXES = [
  { prefix: 'A', description: 'Applications', type: 'application' },
  { prefix: 'COC', description: 'Certificate of Compliance', type: 'application' },
  { prefix: 'LB', description: 'Listed Buildings', type: 'application' },
  { prefix: 'KT', description: 'Trees', type: 'application' },
  { prefix: 'C', description: 'Complaint', type: 'enforcement' },
  { prefix: 'E', description: 'Enquiry', type: 'enforcement' },
  { prefix: 'UA', description: 'Unauthorised Development', type: 'enforcement' },
  { prefix: 'EN', description: 'Enforcement Notice', type: 'notice' },
  { prefix: 'S37', description: 'Section 37 Letter' , type: 'notice'},
  { prefix: 'SN', description: 'Stop Notice', type: 'notice' },
  { prefix: 'FN', description: 'Final Notice', type: 'notice' },
  { prefix: 'WN', description: 'Warning Notice', type: 'notice' }
];

/**Types of file types */
export const FILE_TYPES = {
  FORMAL: 'Formal Application',
  CHATTEL: 'Chattel Application',
  PERMITTED: 'Permitted Development Application',
  LISTED: 'Listed Building Application',
  TREE: 'Permission to Kill Tree',

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
  // private static _buildingStart = new FileType(FILE_TYPES.BUILDING_START, 'BS', 'BS', true);
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
  // public static get buildingStart() { return this._buildingStart; }
  public static get continuingUse() { return this._continuingUse; }
  public static get temporaryUse() { return this._temporaryUse; }
}

export const NOTICE_TYPE_PREFIXES = {
  WARNING: 'WN',
  ENFORCEMENT: 'EN',
  FINAL: 'FN',
  STOP: 'SN',
  SECTION37: 'S37'
};

/**Type of notice */
export class NoticeType {
  /**
   * Creates a new notice type
   * @param name Name of the notice
   * @param prefix prefix associated with notice
   */
  constructor(public name: string, public prefix: string) { }

  public static getNoticeType(prefix: string): NoticeType {
    let type: NoticeType = null;
    switch (prefix) {
      case NOTICE_TYPE_PREFIXES.WARNING: { type = RegistryNoticeTypes.warning(); break; }
      case NOTICE_TYPE_PREFIXES.STOP: { type = RegistryNoticeTypes.stop(); break; }
      case NOTICE_TYPE_PREFIXES.ENFORCEMENT: { type = RegistryNoticeTypes.enforcement(); break; }
      case NOTICE_TYPE_PREFIXES.FINAL: { type = RegistryNoticeTypes.final(); break; }
      case NOTICE_TYPE_PREFIXES.SECTION37: { type = RegistryNoticeTypes.section37(); break; }
    }
    return type;
  }
}

export class RegistryNoticeTypes {
  public static warning(): NoticeType { return new NoticeType('warning notice', NOTICE_TYPE_PREFIXES.WARNING); }
  public static enforcement(): NoticeType { return new NoticeType('enforcement notice', NOTICE_TYPE_PREFIXES.ENFORCEMENT); }
  public static final(): NoticeType { return new NoticeType('final notice', NOTICE_TYPE_PREFIXES.FINAL); }
  public static stop(): NoticeType { return new NoticeType('stop notice', NOTICE_TYPE_PREFIXES.STOP); }
  public static section37(): NoticeType { return new NoticeType('section 37 notice', NOTICE_TYPE_PREFIXES.SECTION37); }
}
