/**Manages user information */
export class UserInfo {
  
  /**
   * Creates a new userinfo
   * @param username User name of the user
   * @param fullname Fullname of the user
   * @param domain Domain of the user
   */
  constructor(public username: string, public fullname: string, public domain: string) { }
}

export const SYSTEM_USER = new UserInfo('system', 'system', 'system');
