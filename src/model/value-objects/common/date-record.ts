import { Assert } from 'caribviper-common';
import { UserInfo } from './userinfo';
/**
 * Manages date records for create, signed and dispatched
 */
export class DateRecord {
  /**Date created */
  created: Date;
  /**User that created the record */
  creator: UserInfo

  /**Date signed */
  signed: Date;

  /**User that signs the record */
  signer: UserInfo;

  /**Date signed */
  dispatched: Date;
  /**User that dispatches the record */
  dispatcher: UserInfo;

  constructor(user: UserInfo) {
    Assert.isTruthy(user, 'Creator cannot be undefined');
    this.creator = user;
    this.created = new Date();
  }

  /**Indicates if the item can be dispatched */
  get canDispatch():boolean { return !!this.created && !!this.signed; }

  sign(user: UserInfo) {
    this.signed = new Date();
    Assert.isTruthy(user, 'Signer cannot be undefined');
    this.signer = user;
    if(!this.created)
      this.created = this.signed;
  }

  dispatch(user: UserInfo) {
    this.dispatched = new Date();
    Assert.isTruthy(user, 'Dispatcher cannot be undefined');
    this.dispatcher = user;
    if(!this.canDispatch)
      this.signed = this.dispatched;
  }
}
