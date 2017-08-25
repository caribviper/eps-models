import { Contact } from './contact';
import * as moment from 'moment';

export const LABEL_ADDRESS_TYPES = { APPLICANT: 0, AGENT: 1, LAND: 2, CUSTOM: 3 };

export class Label {
  constructor(public contact: Contact, public referenceNo = '', public displayName: string = '', public description: string = '') { }
}

export class LabelSettings {
  public addressType: number = LABEL_ADDRESS_TYPES.LAND;
  public referenceNo: string = '';
  public copies: number;
  public start_row: number = 0;
  public start_col: number = 0;
  public startDate: number = 0;
  public endDate: number = 0;
  public isRange: boolean = false;
  constructor() { }

  static RangeSearch(startDate: number, endDate: number, copies: number = 4, start_row: number = 0, start_col: number = 0): LabelSettings {
    let settings = new LabelSettings;
    settings.addressType = LABEL_ADDRESS_TYPES.LAND;
    settings.isRange = true;
    settings.startDate = startDate < 0 ? moment().subtract(1, 'day').toDate().getTime() : startDate;
    settings.endDate = endDate < 0 ? moment(settings.startDate).add(1, 'day').toDate().getTime() : endDate;
    settings.copies = copies < 0 ? 4 : copies;
    settings.start_row = start_row < 0 ? 0 : start_row;
    settings.start_col = start_col < 0 ? 0 : start_col;
    if (settings.startDate > settings.endDate) {
      settings.startDate = moment().subtract(1, 'day').toDate().getTime();
      settings.endDate = moment(settings.startDate).add(1, 'day').toDate().getTime();
    }
    return settings;
  }

  static ReferenceSearch(referenceNo: string, addressType: number = LABEL_ADDRESS_TYPES.APPLICANT, copies: number = 4, start_row: number = 0, start_col: number = 0): LabelSettings {
    let s = new LabelSettings();
    s.referenceNo = referenceNo;
    s.addressType = addressType < 0 || addressType > 2 ? LABEL_ADDRESS_TYPES.APPLICANT : addressType;
    s.copies = copies < 0 ? 4 : copies;
    s.start_row = start_row < 0 ? 0 : start_row;
    s.start_col = start_col < 0 ? 0 : start_col;
    return s;
  }

  static CustomLabel(copies: number = 4, start_row: number = 0, start_col: number = 0): LabelSettings {
    let s = new LabelSettings();
    s.addressType = LABEL_ADDRESS_TYPES.CUSTOM;
    s.copies = copies < 0 ? 4 : copies;
    s.start_row = start_row < 0 ? 0 : start_row;
    s.start_col = start_col < 0 ? 0 : start_col;
    return s;
  }
}
