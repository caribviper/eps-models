/**Manages user information */
export class UserInfo {
  
  /**
   * Creates a new userinfo
   * @param username User name of the user
   * @param firstname First name of the user
   * @param lastname Last name of the user
   */
  constructor(public username: string, public firstname: string, public lastname: string) { }
}
