import { UserInfo } from './../../value-objects/common/userinfo';

/**
 * Short bit of information with an instruction
 */
export class Note {
  /**
   * 
   * @param content Content/short information to be displayed with file
   * @param user User who added content
   * @param dateAdded Date content was added
   * @param dateExpired Date note expires and is no longer made visible on file
   */
  constructor(public content: string, public user: UserInfo, public dateAdded: Date, public dateExpired: Date = null) { }
}
