import { UserInfo } from './userinfo';
/**
 * Information on the dispatched item
 */
export class DispatchedInfo {
  /**
   * Creates a new dispatched info item
   * @param user User that dispatched item
   * @param dispatchedDate Date item was dispatched
   * @param description A short description about the dispatched item
   */
  constructor(public user: UserInfo, public dispatchedDate: Date, public description:string) { }
}
