import { Contact } from './contact';
import * as moment from 'moment';

export const LABEL_ADDRESS_TYPES = { APPLICANT: 0, AGENT: 1, LAND: 2, CUSTOM: 3 };

export class Label {

  public showReferenceNo: boolean = true;
  public showDisplayName: boolean = true;
  public showDescription: boolean = true;
  public index: number = 0;

  /**
   * 
   * @param contact Contact information
   * @param referenceNo Reference No
   * @param displayName Display Type of application
   * @param description Description of site
   * @param dateReceived Date Received
   */
  constructor(public contact: Contact, public referenceNo = '', public displayName: string = '', public description: string = '', public dateReceived: Date = null) { }

  public get isNewRow(): boolean {
    return this.index % 2 === 0;
  }
}

export class LabelSettings {
  public addressType: number = LABEL_ADDRESS_TYPES.LAND;
  public referenceNo: string = '';
  public copies: number;
  public start_row: number = 0;
  public start_col: number = 0;
  public startDate: Date;
  public endDate: Date;
  public isRange: boolean = false;
  public fileType: string = '';
  constructor() { }

  static RangeSearch(startDate: Date, endDate: Date, copies: number = 4, start_row: number = 0, start_col: number = 0): LabelSettings {
    let settings = new LabelSettings;
    settings.addressType = LABEL_ADDRESS_TYPES.LAND;
    settings.isRange = true;
    settings.startDate = !startDate ? moment().subtract(1, 'day').toDate() : startDate;
    settings.endDate = !endDate ? moment(settings.startDate).add(1, 'day').toDate() : endDate;
    settings.copies = copies < 1 ? 4 : copies;
    settings.start_row = start_row < 0 ? 0 : start_row;
    settings.start_col = start_col < 0 ? 0 : start_col;
    if (settings.startDate.getTime() > settings.endDate.getTime()) {
      settings.startDate = moment().subtract(1, 'day').toDate();
      settings.endDate = moment(settings.startDate).add(1, 'day').toDate();
    }
    return settings;
  }

  static ReferenceSearch(referenceNo: string, addressType: number = LABEL_ADDRESS_TYPES.APPLICANT, copies: number = 4, start_row: number = 0, start_col: number = 0): LabelSettings {
    let settings = new LabelSettings();
    settings.referenceNo = referenceNo;
    settings.addressType = addressType < 0 || addressType > 2 ? LABEL_ADDRESS_TYPES.APPLICANT : addressType;
    settings.copies = copies < 1 ? 4 : copies;
    settings.start_row = start_row < 0 ? 0 : start_row;
    settings.start_col = start_col < 0 ? 0 : start_col;
    return settings;
  }

  static CustomLabel(copies: number = 4, start_row: number = 0, start_col: number = 0): LabelSettings {
    let settings = new LabelSettings();
    settings.addressType = LABEL_ADDRESS_TYPES.CUSTOM;
    settings.copies = copies < 1 ? 4 : copies;
    settings.start_row = start_row < 0 ? 0 : start_row;
    settings.start_col = start_col < 0 ? 0 : start_col;
    return settings;
  }
}
