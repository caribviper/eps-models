import { DomainInfo } from '../../value-objects/common/domain-info';
import { UserInfo } from './../../value-objects/common/userinfo';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

/**
 * Manages the user of the system
 */
export class User extends Entity {
  /** User name */
  username: string;

  /** First name of user */
  firstname: string;

  /** Last name of user */
  lastname: string;

  /** Email address of user */
  email: string = '';

  /** Active status. */
  disabled: boolean = false;

  /** Date of last login */
  lastLoggedOn: Date;

  /** List of groups user belongs to */
  groups: string[] = [];

  /** List of group user supervises */
  supervisorGroups: string[] = [];

  /** security level */
  securityLevel: number = 1;

  /** The main domain of a user */
  domain: DomainInfo = undefined;

  /** Store list of domains user belongs */
  crossDomains: string[] = [];

  /** Hashed password */
  passwordHash = '';

  /**
   * Creates a new user
   * @param username Username of the user
   * @param firstname Firstname of the user
   * @param lastname Lastname of the user
   * @param email Email address o fthe user
   */
  constructor(username: string = '', firstname: string = '', lastname: string = '', email: string = '') {
    super(ENTITY_MODELS.SECURITY.USER, username);
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.disabled = false;
    this.lastLoggedOn = undefined;
    this.groups = [];
    this.supervisorGroups = [];
    this.securityLevel = 1;
  }

  get fullname(): string {
    return this.firstname + ' ' + this.lastname;
  }

  validateEntity() {
    Assert.isTruthy(this.username, 'Invalid username. User name cannot be null/empty');
    Assert.isTruthy(this.firstname, 'Invalid firstname. First name cannot be null/empty');
    Assert.isTruthy(this.lastname, 'Invalid last. Last name cannot be null/empty');
  }

  /**
   * Adds group
   * @param groupName Group to be added
   */
  addGroup(...groupNames: string[]) {
    if (!groupNames || groupNames.length < 1)
      return;
    groupNames.forEach((group: string) => {
      // check to see if group exists and if not add it
      if (this.groups.findIndex((g: string) => { return g.toLowerCase() === group.toLowerCase(); }) < 0)
        this.groups.push(group);
    });
  }

  /**
   * Removes a group
   * @param groupName Group to be removed
   */
  removeGroup(groupName: string) {
    const index = this.groups.findIndex((g: string) => { return g === groupName; });
    if (index > -1)
      this.groups.splice(index, 1);
  }

  /**
   * Adds group for the user to supervise
   * @param groupName Group to be added
   */
  addSupervisorGroup(...groupNames: string[]) {
    if (!groupNames || groupNames.length < 1)
      return;
    groupNames.forEach((group: string) => {
      // check to see if group exists and if not add it
      if (this.supervisorGroups.findIndex((g: string) => { return g === group; }) < 0)
        this.supervisorGroups.push(group);
    });
  }

  /**
   * Removes a group that the user supervises
   * @param groupName Group to be removed
   */
  removeSupervisorGroup(groupName: string) {
    const index = this.supervisorGroups.findIndex((g: string) => { return g === groupName; });
    if (index > -1)
      this.supervisorGroups.splice(index, 1);
  }

  /**
   * Adds the user to a domain
   * @param domain Domain to add the user to
   */
  public addCrossDomain(domain: string) {
    if (!this.crossDomains) this.crossDomains = [];
    if (!this.crossDomains.includes(domain))
      this.crossDomains.push(domain);
  }

  /**
   * Removes the specified domain. If the domain is the main domain it will not be removed
   * @param domain Domain to be removed
   */
  public removeCrossDomain(domain: string) {
    if (!this.crossDomains) this.crossDomains = [];
    const index = this.crossDomains.indexOf(domain);
    if (index > -1)
      this.crossDomains.splice(index, 1);
  }

  /**
   * Creates a user id
   * @param username Username associated with entity
   */
  public static createId(username: string) {
    return Entity.generateId(ENTITY_MODELS.SECURITY.USER, username);
  }

  public static mapToEntity(source): User {
    return Object.assign(new User(), source);
  }

  public static mapToEntityArray(source: User[]): User[] {
    if (source.length < 1)
      return [];
    const array = [];
    source.forEach(element => {
      array.push(Object.assign(new User(), element));
    });
    return array;
  }

  /**
   * Converts a User type to a UserInfo type
   * @param user User to be converted to UserInfo
   */
  public static toUserInfo(user: User): UserInfo {
    return new UserInfo(user.username, user.firstname + ' ' + user.lastname, user.domain.code);
  }

}
