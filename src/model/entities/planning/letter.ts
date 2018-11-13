import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';
import { ENTITY_MODELS, UserInfo, AttachedPicture, Contact } from '../../..';
export class Letter extends Entity {

  /** Gets/sets the date the letter was created */
  public created: Date = null;

  /**Gets/sets the date the date the letter was signed */
  public signed: Date = null;
  /**Gets the date the letter was dispatched */
  public dispatched: Date = null;
  /**Gets the user that dispatched the letter */
  public ddispatchingUser: UserInfo;
  /**Gets the date the letter was last updated */
  public updated: Date = null;
  /**Gets the subject matter of the letter */
  public subject: string = '';
  /**Gets the current owner/signor of the letter */
  public owner: UserInfo = null;
  /**Gets the template name used by the letter */
  public templateName: string = '';
  /**Gets the template id used by the letter */
  public templateId: string = '';
  /**Gets a breif description about the letter */
  public description: string = '';

  /**Greeting used within letter */
  public salutation: string = '';

  /**End of letter*/
  public valediction: string = '';

  /**CC information */
  public carbonCopy: string = '';

  /**Attached pictures */
  attachedPictures: AttachedPicture[];

  /**contacts of the letter */
  contacts: Contact[];

  /**Stores the vairous fields an their values */
  formFields: any = {};

  constructor(guid: string = '', public registryId: string = '', public content: string = '', public creator: UserInfo = null) {
    super(ENTITY_MODELS.PLANNING.LETTER, Letter.createId(registryId, guid), true);
    this.created = new Date();
    this.updated = this.created;
    this.attachedPictures = [];
    this.contacts = [];
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Letter cannot be transient');
    Assert.isTruthy(this.registryId, 'Letter must have a valid registry id');
    Assert.isTruthy(this.content, 'Letter must have valid content');
  }

  /**Indicates if the letter has pictures attached */
  get hasPictures(): boolean {
    return !!this.attachedPictures && this.attachedPictures.length > 0;
  }

  /**
   * Determines if the letter can be signed
   * @param username Username whose details are being verifyed as owner
   */
  public canSign(username: string): boolean {
    return this.owner.username === username && !this.signed;
  }

  /**
   * Signs the specified letter
   * @param username Username who is attempting to sign letter
   */
  public sign(username: string) {
    if (this.canSign(username))
      this.signed = new Date();
  }

  public canDispatch(): boolean {
    return !!this.signed;
  }

  public dispatch(user: UserInfo) {
    if (this.canDispatch()) {
      this.dispatched = new Date();
      this.ddispatchingUser = user;
    }
  }

  public static createId(registryId: string = '', guid: string = '') {
    if (!registryId)
      return '';
    if (!guid)
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.LETTER);
    return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.LETTER, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Letter {
    let o = Object.assign(new Letter(), source);
    return o;
  }

  public static mapToEntityArray(source: Letter[]): Letter[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      let o = Object.assign(new Letter(), element);
      array.push(o);
    });
    return array;
  }
}
