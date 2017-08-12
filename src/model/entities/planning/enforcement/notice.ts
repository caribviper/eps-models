import { NoticeType } from './../../../value-objects/enumerators/filetype';
import { UserInfo } from './../../../value-objects/common/userinfo';
import { DateRecord } from './../../../value-objects/common/date-record';
import * as numeral from 'numeral';

/**
 * Specifies the enforcement notice done
 */
export class Notice {

  public dates: DateRecord;

  /**Id of the linked document */
  public documentId: string;

  /**Counter value applied to notice */
  public counterValue: number;

  /**Reference number for notice */
  public noticeNo: string;

  constructor(public type: NoticeType, public content: string, user: UserInfo) {
    this.dates = new DateRecord(user);
  }

  generateNo(area: string) {
    this.noticeNo = this.type.prefix + '/'
      + numeral(this.counterValue).format('0000') + '/'
      + numeral(this.dates.created.getFullYear()).format('0000')
      + '/' + area;
  }

  /**
   * Signs a notice with the specified user
   * @param user User signing the notice
   */
  sign(user: UserInfo) { this.dates.sign(user); }

  /**
   * Dispatches a notice by the specifed user
   * @param user User dispatching the notice
   */
  dispatch(user: UserInfo) { this.dates.dispatch(user); }

}
